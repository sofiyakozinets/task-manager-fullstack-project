"use client";

import React, { useEffect } from "react";
import { ColorPicker as ColorPickerBase } from "@mantine/core";

import { COLORS } from "lib/constants/colors";
import { Color } from "lib/types";

// Union of hex values
type ColorHex = (typeof COLORS)[Color];

// Map hex value to color name
type HexToColor = {
  [K in Color as (typeof COLORS)[K]]: K;
};

const HEX_TO_COLOR = Object.fromEntries(
  Object.entries(COLORS).map(([key, value]) => [value, key])
) as Readonly<HexToColor>;

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
  const handleChange = (colorHex: string): void => {
    onPick(HEX_TO_COLOR[colorHex as ColorHex]);
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
      pickedSwatch.style.outline = `1px solid #495057`;
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
