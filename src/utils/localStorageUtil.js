// Save progress to localStorage
export const saveProgressToLocalStorage = (activityId, steps) => {
    const progress =
        JSON.parse(localStorage.getItem("activitiesProgress")) || {};
    progress[activityId] = steps;
    localStorage.setItem("activitiesProgress", JSON.stringify(progress));
};

// Get progress from localStorage
export const getProgressFromLocalStorage = () => {
    const progress =
        JSON.parse(localStorage.getItem("activitiesProgress")) || {};
    return progress;
};

// Delete progress from localStorage
export const deleteProgressFromLocalStorage = (activityId) => {
    const progress =
        JSON.parse(localStorage.getItem("activitiesProgress")) || {};
    delete progress[activityId];
    localStorage.setItem("activitiesProgress", JSON.stringify(progress));
};
