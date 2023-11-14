export default function urlToID(url: string): string {
    const video_id = url.split('v=')[1];
    const ampersandPosition = video_id.indexOf('&');
    if (ampersandPosition !== -1) {
        return video_id.substring(0, ampersandPosition);
    }
    return video_id;
}