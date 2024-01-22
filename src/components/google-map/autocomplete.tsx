import { useAtomValue } from "jotai";
import { useTheme } from "next-themes";
import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useRef, useState } from "react";
import { atomWithReset, useResetAtom } from "jotai/utils";
import { Input, InputProps } from "@/components/ui/input";
import cn from "@/utils/class-names";
import { darkMode } from "@/components/google-map/map-styles";
import Spinner from "@/components/ui/spinner";
import { useFormikContext } from "formik";

export type Location = {
  address: string;
  lat: number;
  lng: number;
};

interface GoogleMapsAutocompleteProps {
  apiKey: string;
  hideMap?: boolean;
  hideInput?: boolean;
  className?: string;
  mapClassName?: string;
  inputProps?: InputProps;
  spinnerClassName?: string;
  onPlaceSelect: (place: Location) => void;
  onMapClick: (
    event: google.maps.MapMouseEvent,
    mapInstance: google.maps.Map
  ) => void;
  markers?: google.maps.Marker[];
}

export const locationAtom = atomWithReset<Location>({
  address: "",
  lat: 9.005401,
  lng: 38.763611,
});

export default function Autocomplete({
  apiKey,
  className,
  hideMap = false,
  hideInput = false,
  mapClassName,
  inputProps,
  onPlaceSelect,
  spinnerClassName,
  onMapClick,
  markers,
}: GoogleMapsAutocompleteProps) {
  const { setFieldValue } = useFormikContext();
  // check for dark mode
  const { theme } = useTheme();
  // global location state
  const location = useAtomValue(locationAtom);

  // to handle / clear input state
  const [inputValue, setInputValue] = useState("");

  const [newLocation, setNewLocation] = useState<any>(null);

  // map loading state
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // to reset location
  const resetLocation = useResetAtom(locationAtom);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey,
      version: "weekly",
      libraries: ["places"],
    });

    loader.importLibrary("maps").then(({ Map }) => {
      const autocompleteInstance = new google.maps.places.Autocomplete(
        inputRef.current as HTMLInputElement
      );
      setAutocomplete(autocompleteInstance);

      autocompleteInstance.addListener("place_changed", () => {
        const selectedPlace =
          autocompleteInstance.getPlace() as google.maps.places.PlaceResult;
        handlePlaceSelect(selectedPlace);
      });
      setIsLoading(false);

      if (!hideMap && mapRef.current) {
        const mapInstance = new Map(mapRef.current, {
          center: {
            lat: newLocation ? newLocation.lat : location.lat,
            lng: newLocation ? newLocation.lng : location.lng,
          },
          zoom: 15,
          mapTypeControl: false,
          fullscreenControl: false,
          ...(theme === "dark" && {
            styles: darkMode,
          }),
        });

        markers &&
          markers.length > 0 &&
          markers.forEach((marker) => {
            marker.setMap(mapInstance);
          });
      }

      if (!hideMap && mapRef.current) {
        const mapInstance = new Map(mapRef.current, {
          center: {
            lat: newLocation ? newLocation.lat : location.lat,
            lng: newLocation ? newLocation.lng : location.lng,
          },
          zoom: 15,
          mapTypeControl: false,
          fullscreenControl: false,
          ...(theme === "dark" && {
            styles: darkMode,
          }),
        });
        markers &&
          markers.length > 0 &&
          markers.forEach((marker) => {
            marker.setMap(mapInstance);
          });

        mapInstance.addListener("click", (event: google.maps.MapMouseEvent) => {
          // Handle map click event
          onMapClick(event, mapInstance);
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.lat, location.lng, theme, hideMap, newLocation, markers]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (autocomplete) {
      const input = event.target.value;
      setInputValue(input);

      const autocompleteService = new google.maps.places.AutocompleteService();
      autocompleteService.getPlacePredictions({ input, types: ["geocode"] });
    }
  };

  const handlePlaceSelect = (selectedPlace: google.maps.places.PlaceResult) => {
    if (selectedPlace && selectedPlace.formatted_address) {
      const { formatted_address, geometry } = selectedPlace;

      const place: Location = {
        address: formatted_address,
        lat: geometry?.location?.lat() || 0,
        lng: geometry?.location?.lng() || 0,
      };

      setNewLocation({
        lat: geometry?.location?.lat(),
        lng: geometry?.location?.lng(),
      });

      onPlaceSelect(place);
      setInputValue(formatted_address);
    }
  };

  return (
    <div className={cn(className)}>
      {!hideInput && (
        <Input
          ref={inputRef}
          value={inputValue}
          onClear={() => {
            resetLocation();
            setInputValue("");
          }}
          onChange={handleInputChange}
          clearable={inputValue ? true : false}
          {...inputProps}
        />
      )}

      {isLoading && (
        <div className={cn(spinnerClassName)}>
          <Spinner />
        </div>
      )}

      {!hideMap && (
        <div
          id="map"
          ref={mapRef}
          className={cn("h-full w-full", mapClassName)}
        />
      )}
    </div>
  );
}
