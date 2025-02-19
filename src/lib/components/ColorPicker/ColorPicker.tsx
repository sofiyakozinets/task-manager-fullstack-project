"use client";

import React, { useEffect } from "react";
import { ColorPicker as ColorPickerBase, DEFAULT_THEME } from "@mantine/core";

import { COLORS } from "lib/constants/colors";
import { Color } from "lib/types";

type ColorHex = (typeof COLORS)[Color];

const COLORS_BY_HEX = Object.fromEntries(
  Object.entries(COLORS).map(([key, value]) => [value, key])
) as Readonly<Record<ColorHex, Color>>;

const SWATCHES: Array<ColorHex> = [
  COLORS.WHITE,
  COLORS.GRAY,
  COLORS.PINK,
  COLORS.BLUE,
  COLORS.GREEN,
  COLORS.RED,
  COLORS.YELLOW
];

type ColorPickerProps = {
  pickedColor: Color;
  onPick: (color: Color) => void;
};

const ColorPicker = ({ onPick, pickedColor }: ColorPickerProps) => {
  const handleChange = (colorHex: ColorHex): void => {
    onPick(COLORS_BY_HEX[colorHex]);
  };

  useEffect((): void => {
    document
      .querySelectorAll<HTMLButtonElement>(
        `.mantine-ColorPicker-swatches button:not([aria-label="${COLORS[pickedColor]})`
      )
      // eslint-disable-next-line no-param-reassign, no-return-assign
      .forEach((el) => (el.style.outline = "none"));
    const pickedSwatch = document.querySelector<HTMLButtonElement>(
      `.mantine-ColorPicker-swatches button[aria-label="${COLORS[pickedColor]}"]`
    );
    if (pickedSwatch) {
      pickedSwatch.style.outline = `1px solid ${DEFAULT_THEME.colors.gray[7]}`;
    }
  }, [pickedColor]);

  return (
    <ColorPickerBase
      data-cy="color-picker"
      fullWidth
      onChange={handleChange}
      swatches={SWATCHES}
      swatchesPerRow={SWATCHES.length}
      withPicker={false}
    />
  );
};

export default ColorPicker;
