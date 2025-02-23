import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import JobCard from "./jobCard";
import { useEffect, useState } from "react";
import axios from 'axios';

const TabCatagories = () => {
  const [ jobs, setJobs] = useState([])
  useEffect(() =>{
    const getData = async() =>{
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/jobs`)
      setJobs(data)
    }
    getData()
  },[])


  return (
    <Tabs>
      <div className="container font-lato px-6 py-10 mx-auto">
        <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl">
          Browse Jobs By Categories
        </h1>
        <p className="max-w-2xl mx-auto my-6 text-center text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi corporis
          facilis rerum quis quo repellat, impedit illo eius eaque nihil, vero
          illum! Voluptatem quo repellat tempore deserunt similique culpa
          officia.
        </p>
        <div className="flex font-semibold items-center justify-center">
          <TabList>
            <Tab>Web Development</Tab>
            <Tab>Graphics Design</Tab>
            <Tab>Digital Marketing</Tab>
          </TabList>
        </div>

        <TabPanel>
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {jobs
              .filter((j) => j.category === "Web Development")
              .map((job) => (
                <JobCard key={job._id} job={job}></JobCard>
              ))}
          </div>
        </TabPanel>

        <TabPanel>
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {jobs
              .filter((j) => j.category === "Graphics Design")
              .map((job) => (
                <JobCard key={job._id} job={job}></JobCard>
              ))}
          </div>
        </TabPanel>
 
        <TabPanel>
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {jobs
              .filter((j) => j.category === "Digital Marketing")
              .map((job) => (
                <JobCard key={job._id} job={job}></JobCard>
              ))}
          </div>
        </TabPanel>
      </div>
    </Tabs>
  );
};

export default TabCatagories;
