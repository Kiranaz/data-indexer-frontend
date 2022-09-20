import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/card";
import JsonFormatter from "react-json-formatter";
import { serverURL } from "../../constant";

const DetailPage = () => {
  const [indexer, setIndexer] = useState<any>();
  const { user, address } = useParams();
  const jsonStyle = {
    propertyStyle: { color: "red" },
    stringStyle: { color: "green" },
    numberStyle: { color: "darkorange" },
  };
  useEffect(() => {
    axios.get(serverURL + "indexer/" + user + "/" + address).then((res) => {
      console.log("file: index.tsx ~ line 11 ~ axios.get ~ res", res?.data);
      if (res?.data) {
        setIndexer(res.data);
      }
    });
  }, []);
  return (
    <>
      <div className="truncate text-clip">
        Access URL: {`${serverURL}indexer/${user}/${address}`}
      </div>
      <section className="relative pt-16 bg-blueGray-50">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="w-10/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto -mt-78">
              <div>
                Sync Status:{" "}
                {indexer?.isSynced ? "100%" : "indexing in progress..."}
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
