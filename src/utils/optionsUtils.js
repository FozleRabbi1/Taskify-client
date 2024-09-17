import { tagsArray } from "../constant/constant";

export const statusOptions = ["On Going", "Started", "Default", "In Review", "Completed"].map((item) => ({
    value: item,
    label: item,
}));

export const tagsOptions = tagsArray.map((item) => ({
    value: item,
    label: item,
}));

export const propertyOptions = ["Default", "High", "Medium", "Low"].map((item) => ({
    value: item,
    label: item,
}));