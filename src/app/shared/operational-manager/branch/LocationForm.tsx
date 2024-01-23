"use client";

import React, { useState } from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";

import { useGetHeaders } from "@/hooks/use-get-headers";

import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import { RadioGroup } from "@/components/ui/radio";
import { AdvancedRadio } from "@/components/ui/advanced-radio";
import { FaCheckCircle } from "react-icons/fa";
import Autocomplete, { Location } from "@/components/google-map/autocomplete";
import CustomSelect from "@/components/ui/form/select";

const LocationForm = ({
  className,
  initialCityValue,
}: {
  className?: string;
  initialCityValue?: string | null;
}) => {
  const headers = useGetHeaders({ type: "FormData" });

  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [value, setValue] = React.useState("search");
  const { setFieldValue } = useFormikContext();
  const handlePlaceSelect = (place: Location) => {
    setFieldValue("latitude", place.lat);
    setFieldValue("longitude", place.lng);
  };

  const removeMarkers = () => {
    markers.forEach((marker: any) => {
      marker.setMap(null);
    });

    setMarkers([]);
  };

  const onMapClick = (
    event: google.maps.MapMouseEvent,
    mapInstance: google.maps.Map
  ) => {
    const latitude = event.latLng?.lat();
    const longitude = event.latLng?.lng();

    if (latitude && longitude) {
      setFieldValue("latitude", latitude);
      setFieldValue("longitude", longitude);

      removeMarkers();

      const marker = new google.maps.Marker({
        position: {
          lat: latitude,
          lng: longitude,
        },
        title: "Clicked Location",
      });

      setMarkers([marker]);
    }
  };

  const cityData = useFetchData(
    [queryKeys.getAllCities],
    `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}operation-manager/cities`,
    headers
  );

  function ChooseSelection() {
    return (
      <RadioGroup
        value={value}
        setValue={setValue}
        className="grid grid-cols-2 gap-4 w-full"
      >
        <AdvancedRadio
          name="payment-secondary"
          value="search"
          className="mb-4 flex w-full flex-col space-y-2 rounded-xl border border-secondary-lighter p-5 text-sm hover:cursor-pointer hover:border-primary"
          inputClassName="[&:checked~span>div>.icon]:block [&:checked~span]:ring-1 [&:checked~span]:ring-offset-0 [&:checked~span]:ring-primary [&:checked~span]:!border-primary"
        >
          <div className="flex justify-between">
            <FaCheckCircle className="icon hidden h-5 w-5 text-primary" />
            <span className="font-medium text-black">Search location</span>
          </div>
        </AdvancedRadio>
        <AdvancedRadio
          name="payment-primary"
          value="select"
          className="flex w-full flex-col space-y-2 rounded-xl border border-primary-lighter p-5 text-sm hover:cursor-pointer hover:border-primary"
          inputClassName="[&:checked~span>div>.icon]:block [&:checked~span]:ring-1 [&:checked~span]:ring-offset-0 [&:checked~span]:ring-primary [&:checked~span]:!border-primary"
        >
          <div className="flex justify-between">
            <FaCheckCircle className="icon hidden h-5 w-5 text-primary" />
            <span className="font-medium text-black">Pin on the map</span>
          </div>
        </AdvancedRadio>
      </RadioGroup>
    );
  }

  return (
    <div className="col-span-2 w-full flex flex-col space-y-2">
      <div className="w-full">
        <ChooseSelection />
        <Field name="latitude">
          {() => (
            <Autocomplete
              apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string}
              onMapClick={onMapClick}
              onPlaceSelect={handlePlaceSelect}
              hideInput={value === "select"}
              mapClassName="rounded-lg"
              spinnerClassName="grid h-full w-full place-content-center"
              className="relative h-[500px] w-full flex-grow rounded-lg bg-gray-50"
              inputProps={{
                size: "lg",
                type: "text",
                rounded: "pill",
                placeholder: "Search for a location",
                className: "absolute z-10 flex-grow block right-7 left-7 top-7",
                inputClassName: "bg-white dark:bg-gray-100 border-0",
              }}
              markers={markers}
            />
          )}
        </Field>

        <ErrorMessage
          name={"latitude"}
          component="div"
          className={"text-xs capitalize text-red-500 pt-1 font-medium"}
        />

        <div className="mt-4">
          <CustomSelect
            isSearchable
            name="city_id"
            label="Select City"
            options={cityData?.data?.data}
            defaultValue={initialCityValue}
            onChange={(selectedOption) => {
              setFieldValue("city_id", selectedOption.id);
            }}
            placeholder="select City"
            getOptionValue={(furnished: any) => furnished?.id}
            getOptionLabel={(furnished: any) => furnished?.name?.english}
            noOptionsMessage={() => "City here"}
          />
        </div>
      </div>
    </div>
  );
};

export default LocationForm;
