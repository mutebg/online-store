import React from "react";
import renderer from "react-test-renderer";
import Component from "../index.js";

describe("Render FullScreen Component", () => {
  it("Render", () => {
    const component = renderer.create(
      <Component
        interval="5000"
        background={["image.jpg", "video.mp4", "video.ogv", "image.png"]}
      >
        <div>test 1</div>
        <div>test 2</div>
        <div>test 3</div>
        <div>test 4</div>
      </Component>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
