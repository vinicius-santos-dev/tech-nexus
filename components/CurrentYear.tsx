"use client";

/**
 * CurrentYear Component:
 * Displays the current year dynamically
 */
const CurrentYear = () => {
  return <>{new Date().getFullYear()}</>;
};

export default CurrentYear;