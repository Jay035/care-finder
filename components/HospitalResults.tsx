"use client";
import Link from "next/link";
import CustomInput from "./CustomInput";
import { useEffect, useState } from "react";
import Image from "next/image";
import useGeoLocation from "@/hooks/useGeoLocationHook";

export default function HospitalResults({ hospitals }: any) {
  const [usersRegion, setUsersRegion] = useState("");
  const nearbyHospitals = hospitals?.data?.filter((el: HospitalProps) =>
    el?.state?.name.toLowerCase().includes(usersRegion?.toLowerCase())
  );
  console.log(nearbyHospitals);
  const [data, setData] = useState(
    usersRegion !== "" ? nearbyHospitals : hospitals?.data
  );
  // const [data, setData] = useState(hospitals?.data);
  const [query, setQuery] = useState("");
  const [searchError, setSearchError] = useState("");
  const filteredHospitals = hospitals?.data?.filter((el: HospitalProps) =>
    el?.state?.name.toLowerCase().includes(query.toLowerCase())
  );

  const {
    locationCoord: { loaded, coordinates },
  } = useGeoLocation();
  const { longitude, latitude } = coordinates;
  console.log(coordinates, loaded);

  const getResult = async () => {
    // const res = await fetch(`https://api.distancematrix.ai/maps/api/geocode/json?latlng=${latitude},${longitude}&key=<your_access_token>`)
    const url = `https://forward-reverse-geocoding.p.rapidapi.com/v1/reverse?lat=${latitude}&lon=${longitude}&accept-language=en&polygon_threshold=0.0`;
    const options = {
      method: "GET",
      headers: {
        // "X-RapidAPI-Key": process?.env?.rapidApiKey,
        "X-RapidAPI-Host": "forward-reverse-geocoding.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log("result", result);
      console.log("user's city", result?.address?.city);
      setUsersRegion(result?.address?.city);
      setData(nearbyHospitals);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (e: any) => {
    e.preventDefault();
    console.log(filteredHospitals);
    setData(filteredHospitals);
    setQuery(e.target.value);
    setSearchError("");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setData(filteredHospitals);
    if (query === "") {
      setSearchError("Please submit a value");
    }
  };

  useEffect(() => {
    getResult();
  }, []);

  return (
    <section className="">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-start max-w-4xl lg:mx-auto items-center text-[#9CA3AF] py-2 px-2 md:px-3 gap-[9.5px] border rounded-lg w-full md:border-[#6B7280]">
          <Image
            src="/search-icon.png"
            alt="search icon"
            width={18}
            height={18}
          />
          <CustomInput
            type="text"
            dataTestId="searchbar"
            className="w-full outline-none text-black"
            value={query}
            name="search"
            onchange={handleSearch}
            placeholder="Enter your Location"
          />
        </div>
        {query && (
          <p className="mt-2">
            Search result for{" "}
            <span className="text-[#14532d]">&apos;{query}&apos;</span>
          </p>
        )}
        {searchError && <p className="text-red-500">{searchError}</p>}
      </form>
      {/* search result for "" */}
      {/* Results */}
      {/* <Suspense fallback={<p>Loading feed...</p>}>
        </Suspense> */}

      <div className="my-12 grid gap-4 w-full lg:grid-cols-2">
        {data?.map((hospital: HospitalProps) => (
          <section
            key={hospital?.id}
            className="flex justify-between gap-3 w-full items-center border border-[#2B7669] rounded-lg px-3 py-2"
          >
            <div className="flex flex-col gap-2 w-fit max-w-[240px]">
              <h2 className="font-bold text-[#14532d]">{hospital?.name}</h2>
              <p className="text-[#6B7280]  truncate">{hospital?.address}</p>
            </div>
            {/* <Link
              href={`/hospitals/${hospital?.id}`}
              className="bg-[#14532D] py-2 px-4 text-white rounded-[30px] transition hover:text-black hover:bg-white hover:border hover:border-black"
            >
              View
            </Link> */}
          </section>
        ))}
      </div>
    </section>
  );
}
