function checkPermission() {}

export function getCurrentLocation() {
    if (!navigator.geolocation) {
        console.error('Geo location not supported');
        return null;
    } else {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log(position)
            },
            (error) => {
                console.error(error);
            }
        );

        return 'hi';
    }
}
