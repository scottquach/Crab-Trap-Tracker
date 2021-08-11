function checkPermission() {}

export function watchPosition() {
    if (!navigator.geolocation) {
        console.error('Geo location not supported');
        return null;
    } else {
        navigator.geolocation.watchPosition(
            (position) => {
                console.log('watched position', position);
            },
            (err) => {
                console.error('watch position error', err);
            },
            {
                enableHighAccuracy: true,
            }
        );
    }
}

export async function getCurrentLocation() {
    if (!navigator.geolocation) {
        console.error('Geo location not supported');
        return null;
    } else {
        return await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log(position);
                    resolve(position.coords);
                },
                (error) => {
                    console.error(error);
                    reject(error);
                },
                {
                    enableHighAccuracy: true,
                }
            );
        });
    }
}
