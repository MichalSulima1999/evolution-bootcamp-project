import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Machine from "../src/components/game/adventure/Machine";
import { Drum } from "../src/classes/actions/AdventureActions";
import { act } from "react-dom/test-utils";

describe("Machine component", () => {
  it("renders with default props", () => {
    render(<Machine spinning={false} setSpinning={() => {}} drums={[]} />);
    const drumImgs = screen.getAllByRole("sprite");
    expect(drumImgs.length).toBe(3);
    drumImgs.forEach((img) => {
      expect(img.getAttribute("image")).toContain("ChestYellow.png");
    });
  });

  it("renders with specified drums", () => {
    render(
      <Machine
        spinning={false}
        setSpinning={() => {}}
        drums={[Drum.FIGHT, Drum.HEAL, Drum.TREASURE]}
      />
    );
    const drumImgs = screen.getAllByRole("img");
    expect(drumImgs.length).toBe(3);
    expect(drumImgs[0].getAttribute("src")).toContain("sword.png");
    expect(drumImgs[1].getAttribute("src")).toContain("heart.png");
    expect(drumImgs[2].getAttribute("src")).toContain("ChestYellow.png");
  });

  it("spins drums when spinning prop is true", async () => {
    const setSpinning = vi.fn();
    render(<Machine spinning={true} setSpinning={setSpinning} drums={[]} />);
    await new Promise((resolve) => setTimeout(resolve, 1200)); // wait for one spin to complete
    expect(setSpinning).toHaveBeenCalledTimes(1);
    const drumImgs = screen.getAllByRole("img");
    const src1 = drumImgs[0].getAttribute("src");
    const src2 = drumImgs[1].getAttribute("src");
    const src3 = drumImgs[2].getAttribute("src");
    // make sure drums have changed between spins
    expect(src1).not.toBe(src2);
    expect(src2).not.toBe(src3);
    expect(src1).not.toBe(src3);
  });

  it("stops spinning and shows specified drums when spinning prop becomes false", async () => {
    const setSpinning = vi.fn();
    const drums = [Drum.FREE_SPINS, Drum.WILD_CARD, Drum.TRAP];
    render(<Machine spinning={true} setSpinning={setSpinning} drums={drums} />);
    await new Promise((resolve) => setTimeout(resolve, 1200)); // wait for one spin to complete
    expect(setSpinning).toHaveBeenCalledTimes(1);
    act(() => {
      setSpinning(false);
    });
    const drumImgs = screen.getAllByRole("img");
    expect(drumImgs[0].getAttribute("src")).toContain("Free-spins.png");
    expect(drumImgs[1].getAttribute("src")).toContain("Wild.png");
    expect(drumImgs[2].getAttribute("src")).toContain("trap.png");
  });
});
