// Write your tests here
import React from "react";
import AppFunctional from "./AppFunctional";
import {
  render,
  fireEvent,
  screen,
  getAllByRole,
  getByPlaceholderText,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
test("sanity", () => {
  expect(true).toBe(true);
});
test("succesful rendering", () => {
  render(<AppFunctional />);
});
beforeEach(() => {
  render(<AppFunctional />);
});
test("test renders 3 heading(h3)", () => {
  expect(screen.getAllByRole("heading", { value: 3 })).toHaveLength(3);
});
test("test renders 5 buttons", () => {
  expect(screen.getAllByRole("button")).toHaveLength(6);
});
test("test email input with the placeholder-email girin", () => {
  expect(screen.getByPlaceholderText("email girin")).toBeInTheDocument();
});
