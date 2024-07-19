import { useState } from "react";

import Banner from "../components/banner";
import AlbumInfo from "../components/albumInfo";
import GridSettings from "../components/gridSettings";

export default function Creator() {

  const [data, setData] = useState({ rows: 7, columns: 4, resolution: 400 });
  console.log(data);

  return (
    <div className='creator-container'>
      <GridSettings data={data} setData={setData} />
      <AlbumInfo />
      <Banner data={data} setData={setData} />
    </div>
  );
}
