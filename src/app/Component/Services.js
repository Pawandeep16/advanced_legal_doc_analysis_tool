import React from "react";
import Card from "./Card";

function Services() {
  return (
    <div className="flex items-center justify-around">
      {[0, 1, 2].map((item) => (
        <Card
          icon="+"
          head="Create Document"
          desc="Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Voluptatum, incidunt? Accusamus quas aperiam, recusandae repudiandae
        est, laudantium exercitationem cumque commodi dolorem ipsa architecto.
        Exercitationem eaque ea qui, quasi itaque voluptates!"
        />
      ))}
    </div>
  );
}

export default Services;
