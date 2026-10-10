export const projects = [
  {
    id: "1",
    title: "Serious Short",
    category: "Short Form",
    type: "drive",
    videoId: "1h3w_7NTVTj9UMzs94Cj7qAj4f61yzHk4",
    description: "Short-form content with a serious tone.",
  },
  {
    id: "2",
    title: "Comedy Short",
    category: "Short Form",
    type: "drive",
    videoId: "1ab_mV0eU5DUSAK9XUVfp-BBZtEgatxar",
    description: "Short-form content built around comedic moments.",
  },
  {
    id: "3",
    title: "Voice Over B-Roll",
    category: "Long Form",
    type: "drive",
    videoId: "1tfFOu3tqEaMO0Euchu6n-WXOT1fNfg2Q",
    description: "Voice-over narration paired with cinematic B-roll.",
  },
  {
    id: "4",
    title: "Talking Head Video",
    category: "Long Form",
    type: "youtube",
    videoId: "HeIcNepnqXY",
    description: "Long-form editing for an on-camera presentation.",
  },
  {
    id: "5",
    title: "Gaming Content",
    category: "Long Form",
    type: "youtube",
    videoId: "n-OAW9e92Sw",
    description: "Gaming footage, commentary, and a dynamic edit.",
  },
];
export const intro = {
  id: "intro",
  title: "Meet Shannon",
  category: "Video introduction",
  type: "drive",
  videoId: "1a-MQb3a0F5JhaVJtQ0q2bmD5Btu7cMWJ",
  description: "A personal introduction to my work and creative process.",
};
export const colorGrades = [
  {
    id: "8",
    title: "Capstone",
    category: "Color Grading",
    type: "drive",
    videoId: "1CziRZz_02HCG1vxHVxBe7F32PhrxrgNp",
    description: "Color grading sample.",
  },
  {
    id: "9",
    title: "Class",
    category: "Color Grading",
    type: "drive",
    videoId: "1n26EaiNhUN-AZ2amPj88i6WcOtL20z9E",
    description: "Color grading sample.",
  },
  {
    id: "6",
    title: "Color Grading Sample 1",
    category: "Color Grading",
    type: "drive",
    videoId: "14cdbqfqleEVvzklJszjq7cEJsYtHKTnv",
    description: "Color grading sample.",
  },
  {
    id: "7",
    title: "Color Grading Sample 2",
    category: "Color Grading",
    type: "drive",
    videoId: "1V5FiJ0zjH20OIRpA7NmzqZRfeM7V0aMG",
    description: "Color grading sample.",
  },
];
export const thumbnail = (project, width = 1000) =>
  project.type === "youtube"
    ? `https://img.youtube.com/vi/${project.videoId}/hqdefault.jpg`
    : `https://lh3.googleusercontent.com/d/${project.videoId}=w${width}`;
export const videoLink = (project) =>
  project.type === "youtube"
    ? `https://www.youtube.com/watch?v=${project.videoId}`
    : `https://drive.google.com/file/d/${project.videoId}/view`;
export const skills = [
  ["DaVinci Resolve", "The editing desk.", "Editing"],
  ["Color Grading", "Finding the right tone.", "Color"],
  ["Motion Graphics", "Putting ideas in motion.", "Motion"],
  ["Sound Design", "Giving the cut its rhythm.", "Sound"],
  ["Video Compression", "Ready for the final delivery.", "Export"],
];
export const email = "shannonkeanu1@gmail.com";
export const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
  "Video editing project inquiry",
)}&body=${encodeURIComponent(
  "Hi Shannon,\n\nProject type (short-form, long-form, motion graphics, color grading, other):\nLength / number of videos:\nDeadline:\nLink to footage or references:\n\nThanks!",
)}`;
