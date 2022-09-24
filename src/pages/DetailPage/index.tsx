import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "../../components/card";
import JsonFormatter from "react-json-formatter";
import { serverURL } from "../../constant";

const DetailPage = () => {
  const [indexer, setIndexer] = useState<any>();
  console.log("file: index.tsx ~ line 10 ~ DetailPage ~ indexer", indexer);
  const [indexerQuery, setIndexerQuery] = useState<string>("");
  const { user, address } = useParams();
  const jsonStyle = {
    propertyStyle: { color: "red" },
    stringStyle: { color: "green" },
    numberStyle: { color: "darkorange" },
  };
  const getAllData = () => {
    try {
      axios.get(serverURL + "indexer/" + user + "/" + address).then((res) => {
        console.log("file: index.tsx ~ line 11 ~ axios.get ~ res", res?.data);
        if (res?.data) {
          setIndexer(res.data);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getAllData();
  }, []);

  const submitQuery = (e: any) => {
    e.preventDefault();
    if (indexerQuery) {
      try {
        axios
          .post(serverURL + "contracts/" + address, {
            query: JSON.parse(indexerQuery),
          })
          .then((res) => {
            console.log(
              "file: index.tsx ~ line 11 ~ axios.post ~ res",
              res?.data[0]
            );
            if (res?.data) {
              setIndexer({ ...indexer, pastEvents: res?.data[0].pastEvents });
            }
          });
      } catch (e) {
        console.log(e);
      }
    } else {
      getAllData();
    }
  };
  return (
    <>
      <div className="truncate text-clip">
        Access URL:{" "}
        <a
          href={`${serverURL}indexer/${user}/${address}`}
          target="_blank"
          className="hover:text-green-500"
        >{`${serverURL}indexer/${user}/${address}`}</a>
      </div>
      <section className="relative pt-16 bg-blueGray-50">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="w-10/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto -mt-78">
              <div>
                Sync Status:{" "}
                <span className="text-green-500">
                  {indexer?.isSynced ? "100%" : "indexing in progress..."}
                </span>
              </div>

              <div className="break-inside w-100 text-left relative overflow-hidden flex flex-col justify-between space-y-3 text-sm rounded-xl max-w-[23rem] p-4 mb-4 bg-white text-black dark:bg-slate-800 dark:text-white">
                <form onSubmit={submitQuery}>
                  <label className="font-semibold text-sm text-gray-600 pb-1 block">
                    Query indexer data
                  </label>
                  <textarea
                    cols={4}
                    rows={15}
                    onChange={(e) => {
                      setIndexerQuery(e.target.value);
                    }}
                    value={indexerQuery}
                    placeholder={`write your query here like 
          [ { "$eq":[
            "$$item.eventName",
            "Transfer"
          ]},   
          { "$eq":[
            "$$item.from",
            "0xdDF2ae9156559D8335f2F0cf69dc4f3AF61E6304"
          ]}
      ]`}
                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  ></textarea>
                  <div className="flex justify-between items-center">
                    <button
                      type="submit"
                      className="flex items-center justify-center text-xs font-medium rounded-full px-4 py-1 space-x-1 border-2 border-black bg-white hover:bg-black hover:text-white text-black dark:bg-slate-800 dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black"
                    >
                      <span>Query</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={20}
                        height={20}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h13M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>

              <div className="sticky top-0 ">
                <Card data={indexer} />
              </div>
            </div>
            <div className="w-full md:w-6/12 px-4  text-left	overflow-y-auto max-h-screen">
              {indexer?.pastEvents && (
                <pre>{JSON.stringify(indexer?.pastEvents, null, 2)}</pre>
                // <JsonFormatter
                //   json={JSON.stringify(indexer?.pastEvents)}
                //   tabWith={4}
                //   jsonStyle={jsonStyle}
                // />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DetailPage;
