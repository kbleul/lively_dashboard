"use client";
import React from "react";
import Autocomplete, {
  locationAtom,
  type Location,
} from "@/components/google-map/autocomplete";
import FormGroup from "@/components/form-group";
import cn from "@/utils/class-names";
import { RadioGroup } from "@/components/ui/radio";
import { AdvancedRadio } from "@/components/ui/advanced-radio";
import { FaCheckCircle } from "react-icons/fa";
import { useFormikContext, ErrorMessage, Field } from "formik";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import CustomSelect from "@/components/ui/form/select";

const AddLocationForm = ({ className }: { className?: string }) => {
  const [value, setValue] = React.useState("search");
  const headers = useGetHeaders({ type: "Json" });
  const { setFieldValue } = useFormikContext();
  const handlePlaceSelect = (place: Location) => {
    setFieldValue("lat", place.lat);
    setFieldValue("lng", place.lng);
  };

  const onMapClick = (event: google.maps.MapMouseEvent) => {
    const lat = event.latLng?.lat();
    const lng = event.latLng?.lng();
    if (lat && lng) {
      setFieldValue("lat", lat);
      setFieldValue("lng", lng);
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
          className="flex w-full flex-col space-y-2 rounded-xl border border-secondary-lighter p-5 text-sm hover:cursor-pointer hover:border-primary"
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
    <FormGroup
      title="Center Location "
      description="Edit the Center’s location from here"
      className={cn(className)}
    >
      <div className="col-span-2 w-full flex flex-col space-y-2">
        <ChooseSelection />
        <Field name="lat">
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
            />
          )}
        </Field>

        <ErrorMessage
          name={"lat"}
          component="div"
          className={"text-xs capitalize text-red-500 pt-1 font-medium"}
        />
        <CustomSelect
          isSearchable
          name="city_id"
          label="Select City"
          options={cityData?.data?.data}
          onChange={(selectedOption) => {
            setFieldValue("city_id", selectedOption.id);
          }}
          placeholder="select City"
          getOptionValue={(furnished: any) => furnished?.id}
          getOptionLabel={(furnished: any) => furnished?.name?.english}
          noOptionsMessage={() => "City here"}
        />
      </div>
    </FormGroup>
  );
};

export default AddLocationForm;
