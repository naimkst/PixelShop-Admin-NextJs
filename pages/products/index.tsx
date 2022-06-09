import Link from "next/link";
import { basename } from "path";
import React, { useEffect, useState } from "react";
import { URL } from "url";
import { getAlltData, deleteById } from "../../services/product";
import { ToastContainer, toast } from "react-toastify";
import IsLoading from "../../components/Loading/isloading";
import IsDelete from "../../components/Loading/isdelete";

function Index() {
  const [show, setShow] = useState(null);
  const [Product, setProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [curentPage, setCurrentPage] = useState(0);
  const [showPerPage, setshowPerPage] = useState(50);
  const [search, setSearch] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isDelete, setDelete] = useState(false);

  const getData = async (quantity: number, perpage: number, search: string) => {
    setLoading(true);
    const response = await getAlltData(quantity, perpage, search);
    setProduct(response.data);
    setTotalPage(response.totalPage);
    setLoading(false);
  };

  const deleteHandle = async (id: number) => {
    setDelete(true);
    try {
      const response = await deleteById(id);
      console.log(response);
      setProduct(response);
      toast.success("Delete Successfully");
      setDelete(false);
    } catch (error) {
      toast.error("Something Wrong");
      setDelete(false);
    }
  };

  useEffect(() => {
    getData(curentPage * 5, showPerPage, search);
  }, [curentPage, showPerPage, search]);
  return (
    <>
      <div className="w-full ">
        <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
          <div className="sm:flex items-center justify-between">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
              Projects
            </p>
            <div>
              <Link href="/products/add">
                <button className="inline-flex sm:ml-3 mt-4 sm:mt-0 items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
                  <p className="text-sm font-medium leading-none text-white">
                    New Project
                  </p>
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className=" relative bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
          {isDelete ? (
            <IsDelete/>
          ) : (
            ""
          )}

          <table className="w-full whitespace-nowrap">
            <thead>
              <tr className="h-16 w-full text-sm leading-none text-gray-800">
                <th className="font-normal text-left pl-4">Project</th>
                <th className="font-normal text-left pl-12">Status</th>
                <th className="font-normal text-left pl-20">Featured</th>
                <th className="font-normal text-left pl-20">Date</th>
                <th className="font-normal text-left pl-16">Action</th>
              </tr>
            </thead>

            <tbody className="w-full">
              {Product?.map((prd: any) => (
                <tr
                  key={prd.id}
                  className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
                >
                  <td className="pl-4 cursor-pointer">
                    <div className="flex items-center">
                      <div className="w-10 h-10 object-cover">
                        <img
                          className="w-10 h-10 object-cover"
                          src={`${process.env.NEXT_PUBLIC_PATH}${prd.image}`}
                        />
                      </div>
                      <div className="pl-4">
                        <p className="font-medium">{prd.title}</p>
                        {/* <p className="text-xs leading-3 text-gray-600 pt-2">
                          Herman Group
                        </p> */}
                      </div>
                    </div>
                  </td>

                  <td className="pl-12">
                    <p className="font-medium">{prd.status}</p>
                  </td>
                  <td className="pl-20">
                    <p className="font-medium">{prd.featured}</p>
                  </td>
                  <td className="pl-20">
                    <p className="font-medium">{prd.createdAt}</p>
                  </td>
                  <td className="pl-16">
                    <div className="flex items-center gap-2">
                      <Link href={`/products/${prd.id}`}>
                        <span className=" cursor-pointer">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </span>
                      </Link>
                      <span
                        className=" cursor-pointer"
                        onClick={() => deleteHandle(prd.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {isLoading ? (
           <IsLoading/>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default Index;
