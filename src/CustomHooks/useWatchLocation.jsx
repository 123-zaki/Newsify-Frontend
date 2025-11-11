import { useEffect, useRef } from "react";

export const useWatchLocation = (
  minDistanceMeters = 100,
  minIntervalMs = 60000
) => {
  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
      alert("Geolocation is not supported by your browser");
      return;
    }

    const options = {
      enableHighAccuracy: true,
      maximumAge: 10000, // 10 seconds caching
      timeout: 5000,
    };

    let lastSent = 0; // when last request is sent

    // Watch location of Logged In user
    const watchId = navigator.geolocation.watchPosition(
      async (position) => {
        const now = Date.now();
        if (now - lastSent < minIntervalMs) return;
        const { latitude, longitude } = position.coords;
        // console.log(`Location: {lat: ${latitude}, long: ${longitude}}`);

        const url = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/users/update-location`;

        try {
          const response = await fetch(url, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ latitude, longitude }),
          });

        //   console.log("Res: ", response);

          if (!response.ok) {
            console.warn(
              "Location updation failed: ",
              response.status
            );
          } else {
            const data = await response.json();
            // console.log("Message: ", data.message);
          }

          lastSent = now;
        } catch (error) {
          console.log("Failed to update location: ", error.message);
        }
      },
      (error) => {
        console.log("Error while watching user's location: ", error.message);
      },
      options
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  //   const watchIdRef = useRef(null);
  //   const lastSentRef = useRef({ latitude: null, longitude: null, timestamp: 0 });

  //   useEffect(() => {
  //     if (!navigator.geolocation) {
  //       console.log("Geolocation is not supported by your browser");
  //       alert("Geolocation is not supported by your browser");
  //       return;
  //     }

  //     const now = Date.now();
  //     // const timeSinceLast = now -

  //     const options = {
  //       enableHighAccuracy: true,
  //       maximumAge: 10000, // 10 seconds caching
  //       timeout: 5000,
  //     };

  //     const success = (position) => {
  //       const { latitude, longitude } = position.coords;
  //       console.log(`Location: {lat: ${latitude}, long: ${longitude}}`);

  //       const url = `http://localhost:4500/api/v1/users/location/update-location`;

  //       try {
  //       } catch (error) {}
  //     };

  //     const error = (err) => {
  //         console.warn("Geolocation is not supported by your browser");
  //         alert("Geolocation is not supported by your browser");
  //     };

  //     const id = navigator.geolocation.watchPosition(success, error, options);
  //     id = watchIdRef.current;

  //     return () => {
  //         if(watchIdRef.current !== null) {
  //             navigator.geolocation.clearWatch(id);
  //             watchIdRef.current = null;
  //         }
  //     }
  //   }, []);
};

// Haversine: returns distance in meters between two [lat, lon] pairs
// function haversineDistance([lat1, lon1], [lat2, lon2]) {
//   const R = 6371000; // meters
//   const toRad = (v) => (v * Math.PI) / 180;
//   const dLat = toRad(lat2 - lat1);
//   const dLon = toRad(lon2 - lon1);
//   const a =
//     Math.sin(dLat / 2) ** 2 +
//     Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c;
// }
