export default function getTag(value) {
    const colors = ["success", "info", "warning", "danger"];
    return {
      type: colors[Math.floor(Math.random() * 4)],
      label: value,
    }
}