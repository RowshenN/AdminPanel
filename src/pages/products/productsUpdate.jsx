import React, { useEffect, useRef, useState } from "react";
import Switch from "@mui/joy/Switch";
import Alert from "@mui/joy/Alert";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { KeyboardArrowDown, Add } from "@mui/icons-material";
import { IconButton, Input } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import WarningIcon from "@mui/icons-material/Warning";
// import Button from "@mui/joy/Button";

import { Button, Popconfirm } from "antd";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";
import Modal from "@mui/joy/Modal";
import Sheet from "@mui/joy/Sheet";
import PageLoading from "../../components/PageLoading";
import { validateEmail } from "../../utils/validator";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "../../services/products";
import {
  useGetVariantsByProductQuery,
  useCreateVariantMutation,
  useDeleteVariantMutation,
  useUpdateVariantMutation,
} from "../../services/varriants";
import { useGetAllCategoriesQuery } from "../../services/category";
import { message } from "antd";

const ProductsUpdate = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [file, setFile] = useState(null);
  const [bigPostPicture, setBigPostPicture] = useState(null);
  const [createVarriant, setCreateVarriant] = useState({
    price: 0,
    title: "",
  });
  const [varriants, setVarriants] = useState([]);

  const fileRef = useRef(null);
  const [warning, setWarning] = useState(false);

  const { data: productData, error, isLoading } = useGetProductByIdQuery(id);
  const { data: varriantss } = useGetVariantsByProductQuery(id);
  const { data: categoriesData } = useGetAllCategoriesQuery("");
  const [updateProduct] = useUpdateProductMutation();
  const [updateVariant] = useUpdateVariantMutation();
  const [deleteVariant] = useDeleteVariantMutation();
  const [createVariant] = useCreateVariantMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [product, setProduct] = useState();

  useEffect(() => {
    if (varriantss) {
      setVarriants(varriantss?.data);
    }
  }, [varriantss]);

  useEffect(() => {
    if (productData) {
      setProduct(productData?.data);
    }
  }, [productData]);

  if (isLoading) return <PageLoading />;
  if (error) {
    return <div>Ýalňyşlyk boldy</div>;
  }
  console.log("product", productData, product);

  const updatePost = async () => {
    try {
      const formData = new FormData();
      formData.append("title", product?.title);
      formData.append("category_id", product?.category_id);
      file != null && formData.append("image", file);
      await updateProduct({ id: product.id, formData: formData }).unwrap();
      history.goBack();
    } catch (err) {
      console.error("Pozmakda säwlik:", err);
      message.warning("Başartmady!");
    }
  };

  const createVariants = async () => {
    // const formData = new FormData();
    // formData.append("title", createVarriant?.title);
    // formData.append("price", createVarriant?.price?.toFixed(2));
    // formData.append("product_id", id);
    try {
      await createVariant({
        title: createVarriant?.title,
        price: +parseFloat(createVarriant?.price || 0),
        product_id: id,
      }).unwrap();
      setCreateVarriant({
        price: 0,
        title: "",
      });
      message.success("Goşuldy!");
    } catch (err) {
      console.error("Pozmakda säwlik:", err);
      message.warning("Başartmady!");
    }
  };

  const deletevar = async (item) => {
    try {
      await deleteVariant(item?.id);
      message.success("Üstünlikli pozuldy!");
    } catch (err) {
      console.log(err);
      message.warning("Gaýtadan barlaň!");
    }
  };

  const updateVar = async (item) => {
    try {
      await updateVariant({
        id: item?.id,
        body: {
          price: item?.price,
          title: item?.title,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const editVarriant = (value, i, type, arr) => {
    const updated = arr.map((item, index) =>
      index === i
        ? {
            ...item,
            [type]: value,
          }
        : item
    );
    setVarriants(updated);
  };
  return loading ? (
    <PageLoading />
  ) : (
    <div className="w-full">
      {/* alert */}
      {warning && (
        <Alert
          className="!fixed z-50 top-5 right-5"
          key={"title"}
          sx={{ alignItems: "flex-start" }}
          startDecorator={<WarningIcon />}
          variant="soft"
          color={"warning"}
          endDecorator={
            <IconButton
              onClick={() => setWarning(false)}
              variant="soft"
              color={"warning"}
            >
              <CloseRoundedIcon />
            </IconButton>
          }
        >
          <div>
            <div>{"Maglumat nädogry!"}</div>
            <Typography level="body-sm" color={"warning"}>
              Maglumatlary doly we dogry girizmeli!
            </Typography>
          </div>
        </Alert>
      )}
      {/* header section */}
      <div className="w-full pb-[30px] flex justify-between items-center">
        <h1 className="text-[30px] font-[700]">Harytlar</h1>
      </div>

      <div className="w-full min-h-[60vh] p-5 bg-white rounded-[8px]">
        <div className=" flex items-center gap-4 pb-5 border-b-[1px] border-b-[#E9EBF0]">
          <div className="border-l-[3px] border-blue h-[20px]"></div>
          <h1 className="text-[20px] font-[500]">Harytlar maglumaty</h1>
        </div>

        <div className="flex items-center object-contain justify-between py-[30px]">
          <div className="w-[49%]">
            <h1 className="text-[16px] font-[500]">Harydyň suratlary</h1>
            <div className="flex gap-5 mt-5 justify-start  ">
              <input
                onChange={(e) => setFile(e.target.files[0])}
                ref={fileRef}
                className="hidden"
                type="file"
              />

              <div className="relative">
                <div
                  // onClick={() => fileRef.current.click()}
                  onClick={() =>
                    setBigPostPicture(
                      process.env.REACT_APP_BASE_URL + product?.image_url
                    )
                  }
                  className="  w-[75px] h-[75px] p-0 cursor-pointer border-[#98A2B2] rounded-[6px]"
                >
                  <img
                    className="w-[75px] h-[75px] object-cover rounded-[6px]"
                    src={process.env.REACT_APP_BASE_URL + product?.image_url}
                    alt=""
                  />
                </div>
              </div>

              {file ? (
                <div
                  // onClick={() => fileRef.current.click()}
                  className="  w-[75px] h-[75px] p-0 cursor-pointer border-[#98A2B2] rounded-[6px] relative"
                >
                  <div
                    onClick={() => setFile(null)}
                    className="bg-gray-100 text-[8px] w-[30px] h-[30px] border-2 rounded-[100%] cursor-pointer absolute -top-[20px] -right-[20px]   p-[1px]"
                  >
                    <CloseRoundedIcon className="text-[8px] w-[30px] h-[30px]" />
                  </div>
                  <img
                    className="w-[75px] h-[75px] object-cover rounded-[6px]"
                    src={URL.createObjectURL(file)}
                    alt=""
                  />
                </div>
              ) : (
                <div
                  onClick={() => fileRef.current.click()}
                  className="border-[2px] cursor-pointer border-[#98A2B2] border-dashed p-[25px] rounded-[6px]"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2"
                      stroke="#1C274C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M2 12.4999L3.75159 10.9673C4.66286 10.1699 6.03628 10.2156 6.89249 11.0719L11.1822 15.3616C11.8694 16.0488 12.9512 16.1425 13.7464 15.5837L14.0446 15.3741C15.1888 14.57 16.7369 14.6631 17.7765 15.5987L21 18.4999"
                      stroke="#1C274C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M15 5.5H18.5M18.5 5.5H22M18.5 5.5V9M18.5 5.5V2"
                      stroke="#1C274C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>
          <div className="w-[49%] flex justify-between">
            <div className="w-[380px]">
              <h1 className="text-[18px] font-[500]">Harydy poz</h1>
              <p className="text-[14px] mt-2 font-[500] text-[#98A2B2]">
                Harydy pozmak
              </p>
            </div>
            <Popconfirm
              title="Maglumaty pozmak!"
              description="Siz çyndan pozmak isleýärsiňizmi?"
              onConfirm={async () => {
                const respons = await deleteProduct(id);
                console.log(respons);
                respons?.data?.status == 200
                  ? history.goBack()
                  : message.warning(respons.error.data.message);
              }}
              // onCancel={cancel}
              okText="Hawa"
              cancelText="Ýok"
            >
              <Button danger>Pozmak</Button>
            </Popconfirm>
          </div>
        </div>

        <div className="flex items-center  justify-between py-[15px]">
          <div className="w-[49%]">
            <h1 className="text-[16px] font-[500]">Harydyň ady</h1>
            <input
              value={product?.title}
              onChange={(e) => {
                setProduct({ ...product, title: e.target.value });
              }}
              className="text-[14px] w-full mt-1 text-black font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
              placeholder="Girizilmedik"
              type="text"
            />
          </div>
          <div className="w-[49%]">
            <h1 className="text-[16px] font-[500]">Kategoriýa</h1>
            <Select
              value={product?.category_id}
              onChange={(e, newValue) => {
                setProduct({
                  ...product,
                  category_id: newValue,
                });
              }}
              placeholder="Hemmesini görkez"
              className="text-[14px] w-full h-[47px] mt-1 text-black font-[400]  border-[1px] !bg-white !border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
              indicator={<KeyboardArrowDown className="!text-[16px]" />}
              sx={{
                [`& .${selectClasses.indicator}`]: {
                  transition: "0.2s",
                  [`&.${selectClasses.expanded}`]: {
                    transform: "rotate(-180deg)",
                  },
                },
              }}
            >
              {categoriesData?.data?.map((item, i) => {
                return (
                  <Option key={"option" + i} value={item?.id}>
                    {item?.title}
                  </Option>
                );
              })}
            </Select>
          </div>
        </div>

        <div className="flex items-center flex-wrap  border-b-[2px] justify-between py-[15px]">
          <div className="w-[49%]">
            <h1 className="text-[16px] font-[500]"> Bahasy TMT</h1>
            <input
              value={createVarriant?.price}
              onChange={(e) => {
                setCreateVarriant({
                  ...createVarriant,
                  price: e.target.value,
                });
              }}
              className="text-[14px] w-full mt-1 text-black font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
              placeholder="Girizilmedik"
              type="number"
            />
          </div>
          <div className="w-[49%]">
            <h1 className="text-[16px] font-[500]">Ady</h1>
            <input
              value={createVarriant?.title}
              onChange={(e) => {
                setCreateVarriant({ ...createVarriant, title: e.target.value });
              }}
              className="text-[14px] w-full mt-1 text-black font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
              placeholder="Girizilmedik"
              type="text"
            />
          </div>
          <div className="w-[79%]"></div>
          <div className="w-fit mt-1">
            <Button
              onClick={() => createVariants()}
              className="  !h-[40px] !bg-blue !rounded-[8px] !px-[17px] !w-fit   !text-[14px] !text-white  "
              startDecorator={<Add />}
            >
              Goş
            </Button>
          </div>
        </div>

        {varriants?.map((item, i) => {
          return (
            <div
              key={"var" + i}
              className="flex items-center flex-wrap border-t-[1px] justify-between py-[15px]"
            >
              <div className="w-[49%]">
                <h1 className="text-[16px] font-[500]"> Bahasy TMT</h1>
                <input
                  value={item?.price}
                  onChange={(e) =>
                    editVarriant(e.target.value, i, "price", varriants)
                  }
                  className="text-[14px] w-full mt-1 text-black font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
                  placeholder="Girizilmedik"
                  type="number"
                />
              </div>
              <div className="w-[49%]">
                <h1 className="text-[16px] font-[500]">Ady</h1>
                <input
                  value={item?.title}
                  onChange={(e) =>
                    editVarriant(e.target.value, i, "title", varriants)
                  }
                  className="text-[14px] w-full mt-1 text-black font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
                  placeholder="Girizilmedik"
                  type="text"
                />
              </div>
              <div className="w-[69%]"></div>
              <div className=" flex gap-2 mt-1">
                <Button
                  onClick={() => deletevar(item)}
                  className="  !h-[40px] !bg-red !rounded-[8px] !px-[17px] !w-fit   !text-[14px] !text-white  "
                  // startDecorator={<Add />}
                >
                  Pozmak
                </Button>
                <Button
                  onClick={() => updateVar(item)}
                  className="  !h-[40px] !bg-blue !rounded-[8px] !px-[17px] !w-fit   !text-[14px] !text-white  "
                  // startDecorator={<Add />}
                >
                  Üýtget
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="sticky bottom-0 py-2 bg-[#F7F8FA] w-full">
        <div className=" w-full mt-4 flex justify-between items-center bg-white py-4 px-5 border-[1px] border-[#E9EBF0] rounded-[8px]">
          <div className="flex items-center gap-2"></div>
          <div className="w-fit flex gap-6 items-center ">
            <button
              onClick={() => history.goBack()}
              className="text-blue text-[14px] font-[500] py-[11px] px-[27px] hover:bg-red hover:text-white rounded-[8px]"
            >
              Goýbolsun et
            </button>
            <button
              onClick={() => updatePost()}
              className="text-white text-[14px] font-[500] py-[11px] px-[27px] bg-blue rounded-[8px] hover:bg-opacity-90"
            >
              Ýatda sakla
            </button>
          </div>
        </div>
      </div>

      {/*  bigPostPicture */}
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={bigPostPicture != null}
        onClose={() => setBigPostPicture(null)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 600,
            width: "50%",
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <div className="w-full flex justify-center items-center">
            <img
              className="w-[50%] object-contain"
              src={bigPostPicture}
              alt=""
            />
          </div>
        </Sheet>
      </Modal>
    </div>
  );
};

export default React.memo(ProductsUpdate);
