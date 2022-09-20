import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../../components/card";
import { serverURL } from "../../constant";

const Home = () => {
  const [indexers, setIndexers] = useState([]);
  console.log("file: index.tsx ~ line 8 ~ Home ~ indexers", indexers);

  useEffect(() => {
    axios.get(serverURL + "indexer").then((res) => {
      console.log("file: index.tsx ~ line 11 ~ axios.get ~ res", res);
      if (res?.data) {
        setIndexers(res.data);
      }
    });
  }, []);

  return (
    <div>
      <section className="bg-slate-200">
        <div className="container px-6 py-10 mx-auto">
          <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">
            Data Indexers
          </h1>
          <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">
            {indexers.length > 0
              ? indexers.map((indexer, index) => {
                  console.log(
                    "file: index.tsx ~ line 35 ~ ?indexers.map ~ indexer",
                    indexer
                  );
                  return (
                    <div key={index} className="lg:flex justify-self-center	">
                      <Card data={indexer} />
                    </div>
                  );
                })
              : "No Indexers found..."}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
