function checkPermission() {}

export async function getCurrentLocation() {
    if (!navigator.geolocation) {
        console.error('Geo location not supported');
        return null;
    } else {
        return await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log(position);
                    resolve(position);
                },
                (error) => {
                    console.error(error);
                    reject(error);
                }
            );
        });
    }
}
