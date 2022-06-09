import Link from "next/link";
import { basename } from "path";
import React, { useEffect, useState } from "react";
import { URL } from "url";
import { getAlltData, deleteById } from "../../services/product";
import { ToastContainer, toast } from "react-toastify";

function Index() {
  const [show, setShow] = useState(null);
  const [Product, setProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [curentPage, setCurrentPage] = useState(0);
  const [showPerPage, setshowPerPage] = useState(50);
  const [search, setSearch] = useState("");
  const [isLoading, setLoading] = useState(false);

  const getData = async (quantity: number, perpage: number, search: string) => {
    setLoading(true);
    const response = await getAlltData(quantity, perpage, search);
    setProduct(response.data);
    setTotalPage(response.totalPage);
    setLoading(false);
  };

  const deleteHandle = async (id: number) => {
    try {
      const response = await deleteById(id);
      console.log(response);
      setProduct(response);
      toast.success("Delete Successfully");
    } catch (error) {
      toast.error("Something Wrong");
    }
  };

  useEffect(() => {
    console.log(search);
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
        <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
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
            <div className="flex justify-center w-full text-center content-evenly items-center mt-5 m-auto py-20">
              <svg
                role="status"
                className="w-20 h-20 text-center flex items-center justify-center mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default Index;
