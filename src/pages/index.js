import axios from "axios";
import React from "react";
import { useEffect } from "react";
import Layout from "../components/layout";
import { Table } from "react-daisyui";

const IndexPage = () => {
  useEffect(() => {
    const getData = async () => {
      const data = await axios.get(
        "http://localhost:4041/studytime/sort/videoTime"
      );

      console.log(data);
    };
    getData();
  }, []);
  return (
    <Layout pageTitle="Home Page">
      <div className="overflow-x-auto" key={1}>
        <Table className="rounded-box" key={2}>
          <Table.Head>
            <span key={3}>Name</span>
            <span key={4}>Job</span>
            <span key={5}>Favorite Color</span>
            <span key={6} />
          </Table.Head>
        </Table>
      </div>
    </Layout>
  );
};

export default IndexPage;
