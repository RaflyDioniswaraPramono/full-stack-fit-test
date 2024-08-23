import { useCallback, useEffect, useState } from "react";
import { BackdropLoader, ContentTitle } from "../../components";
import { HouseServices } from "../../services/HouseServices";
import { house3dIcon } from "../../assets";
import { Check, Close, Edit, InfoOutlined, Warning } from "@mui/icons-material";
import { houseDetailState } from "../../states/houseDetailState";
import { editHouseModalState } from "../../states/houseState";
import { refreshHouseData } from "../../states/refreshState";
import { addResidentState } from "../../states/addResidentState";

const Houses = () => {
  const [houseData, setHouseData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { isRefresh, setRefresh } = refreshHouseData();
  const { openAddResidentModal } = addResidentState();
  const { openHouseDetailModal } = houseDetailState();
  const { openEditHouseModal } = editHouseModalState();

  const fetchHouseData = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await HouseServices.getHouses();

      setHouseData(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHouseData();
  }, [fetchHouseData]);

  useEffect(() => {
    if (isRefresh === true) {
      fetchHouseData().finally(() => {
        setRefresh(false);
      });
    }
  }, [fetchHouseData, isRefresh]);

  return (
    <div className="h-full">
      {isLoading && <BackdropLoader />}
      <div className="mb-8">
        <ContentTitle
          title="Manajemen Rumah"
          description="Berikut ini merupakan tampilan rumah yang ada di perumahan Lumajang Indah. Detail rumah yang tersedia dan rumah yang siap huni dapat dilihat dari informasi detail berikut ini."
        />
      </div>
      <div className="grid grid-cols-4 gap-5">
        {houseData.payload?.data.map((houses) => {
          const { id, house_block, house_number, Resident } = houses;

          return (
            <div
              key={id}
              className={`p-3 rounded-md border ${
                Resident === null ? "border-zinc-300" : "border-main"
              } flex items-center justify-center`}>
              <div className="flex flex-col justify-center items-center">
                <p className="text-xs font-medium mb-3">
                  {house_block} - No. {house_number}
                </p>
                <div className="mb-2">
                  {Resident === null ? (
                    <p className="flex items-center justify-center gap-2 text-[0.6em] text-red-500 font-medium px-3 py-1 border border-red-500 rounded-full">
                      Belum Dihuni <Close fontSize="inherit" />
                    </p>
                  ) : (
                    <div className="flex justify-center items-center gap-2">
                      <p className="flex items-center justify-center gap-1 text-[0.6em] text-main font-medium px-3 py-1 border border-main rounded-full">
                        Sudah Dihuni <Check fontSize="inherit" />
                      </p>
                      <p
                        className={`${
                          Resident?.Bills.length > 0 ? "flex" : "hidden"
                        } items-center justify-center gap-1 text-[0.6em] text-red-500 font-medium px-2 py-1 border border-red-500 rounded-full`}>
                        Tagihan <Warning fontSize="inherit" />
                      </p>
                    </div>
                  )}
                </div>
                <button disabled={Resident === null ? false : true} onClick={() => openAddResidentModal(id)}>
                  <img
                    src={house3dIcon}
                    alt="House 3D Icon"
                    className="w-full h-auto max-w-16 max-h-16 mb-4 transform hover:scale-90 duration-150"
                  />
                </button>

                <div className="flex justify-center items-center gap-2">
                  <button
                    disabled={Resident === null ? true : false}
                    onClick={() => openEditHouseModal(houses)}
                    className="disabled:bg-zinc-400 flex justify-center items-center gap-2 rounded-full bg-orange-400 hover:bg-orange-500 transition-colors duration-150 text-white text-[0.65em] px-3 py-1">
                    <Edit fontSize="inherit" />
                    <p>Edit</p>
                  </button>
                  <button
                    onClick={() => openHouseDetailModal(houses)}
                    className="flex justify-center items-center gap-2 rounded-full bg-main hover:bg-secondary transition-colors duration-150 text-white text-[0.65em] px-3 py-1">
                    <InfoOutlined fontSize="inherit" />
                    <p>Detail</p>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Houses;
