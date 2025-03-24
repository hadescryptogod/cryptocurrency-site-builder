// import model
const Site = require("../models/site.model");

// import library
const slugify = require("slugify");
const fs = require("fs");

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyCm_aq3o8HbQ-LElcxxLsKFnWF9j8GOkCU");

// generate content (JSON) based on AI prompt
exports.generateContent = async (req, res, next) => {
  try {
    const userPrompt = req.body.prompt; // donald trump, memecoin, bnb chain, 6% marketing fee 6% liquidity fee, liquidity locked

    const prompt = `I'm developing a website for a cryptocurrency project for my client and I want you to help me generate content for my website based on this information ${userPrompt} which is provided by my client.
    Suggest a short project name based on information I mentioned earlier which is provided by my client with json key "name", an array of 2 background colors that suits the website based on information I mentioned earlier which is provided by my client with json key "backgroundColor" and font color either white or black which contrasts the background color with json key "fontColor". Font color is not required to be pure white like #FFF or pure black like #000, suggest a color used by professionals. 
    Now let's proceed to the sections. There are 7 sections in the websites.
    First is header section with json key "header" so generate a prompt to generate a logo with json key "logoFile", a title with json key "title".
    Second is hero section with json key "hero" so generate a headline with json key "headline", short description with json key "shortDescription", a prompt to generate image above headline and short description with json key "visualFile", and a prompt to generate image without confirmation for the background with json key "backgroundContent" for hero section.
    Third is about section with json key "about" so generate a long description with json key "longDescription", a prompt to generate an image beside long description with json key "visualFile". Also generate an array of features which includes title with json key "title", description with json key "description", a prompt to generate image for each feature that's related to its respective title and description with json key "visualFile".
    Fourth is tokenomics section with json key "tokenomics" so generate an array of fees based on information I mentioned earlier which is provided by my client. Fees include a percentage which is the percentage without percent symbol with json key "percentage", a title with json key "title" where fee will be used, a short description, 1 sentence long, where that fee will be used with json key "description" and a prompt to generate image for each fee that's related to its respective title and description with json key "visualFile".
    Fifth is roadmap section with json key "roadmap" so generate an array of phases which includes a title, not numbered like "Phase 1", with json key "title", a prompt to generate image for each phase with json key "visualFile". Also generate at least 5 milestones for each phase which includes description with json key "title", checked which should be all set to boolean false with json key "checked".
    Sixth is faq or frequently asked questions section with json key "faq" so generate an array of general questions based on information I mentioned earlier which is provided by my client. Questions include a title which is the a short question, 1 sentence long, with json key "title", and answer which is answer for that question with json key "answer".
    Seventh is footer section with json key "footer" so generate a disclaimer with json key "disclaimer".
    Output should be in JSON format only.`;

    // Fifth is faq or frequently asked questions section with json key "faq" so generate an array of general questions like what's the cryptocurrency about, where the cryptocurrency will be deployed, where its transaction fees will be used, if it's liquidity is locked, based on information I mentioned earlier which is provided by my client. Questions include a title which is the a short question, 1 sentence long, with json key "title", and answer which is answer for that question with json key "answer".

    console.log("Generating content...");
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    // console.log(result.response.text());
    let jsonResult = result.response.text().replace("```json", "");
    jsonResult = jsonResult.replace("```", "");
    console.log(jsonResult);

    const siteData = JSON.parse(jsonResult);
    // check if site exists with same site name
    const site = await Site.findOne({
      name: { $regex: new RegExp(siteData.name.trim(), "i") },
    });

    let slug;

    // if site doesn't exists
    if (!site) {
      slug = slugify(siteData.name, { lower: true });
    }
    // if site exists
    else {
      slug =
        slugify(siteData.name, { lower: true }) +
        "-" +
        crypto.randomBytes(3).toString("hex");
    }

    res.status(200).json({ site: { ...siteData, slug } });
  } catch (err) {
    res.status(500).json({ err });
    console.log(err);
  }
};

// generate AI images
exports.generateImages = async (req, res, next) => {
  const siteData = req.body;

  // Set responseModalities to include "Image" so the model can generate  an image
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp-image-generation",
    generationConfig: {
      responseModalities: ["Text", "Image"],
    },
  });

  // header
  console.log("Generating image for header logo...");
  try {
    const headerResponse = await model.generateContent(
      `${siteData.header.logoFile}. Dominated by shades of hex color ${siteData.backgroundColor[0]} and ${siteData.backgroundColor[1]}.Generate 1 image only.`
    );
    for (const part of headerResponse.response.candidates[0].content.parts) {
      // Based on the part type, either show the text or save the image
      if (part.text) {
        console.log(part.text);
      } else if (part.inlineData) {
        const imageData = part.inlineData.data;
        const buffer = Buffer.from(imageData, "base64");
        const filename = `${Date.now()}.png`;
        fs.writeFileSync(`./public/files/${filename}`, buffer);
        console.log(`Image saved as ${filename}.png`);
        siteData.header.logoFile = filename;
      }
    }
  } catch (err) {
    siteData.header.logoFile = "";
    console.log("Error generating image.");
  }

  // hero
  let heroFinished;
  console.log("Generating image for hero visual...");
  try {
    const heroResponse = await model.generateContent(
      `${siteData.hero.visualFile}. Dominated by shades of hex color ${siteData.backgroundColor[0]} and ${siteData.backgroundColor[1]}. Generate 1 image only.`
    );
    for (const part of heroResponse.response.candidates[0].content.parts) {
      // Based on the part type, either show the text or save the image
      if (part.text) {
        console.log(part.text);
      } else if (part.inlineData) {
        const imageData = part.inlineData.data;
        const buffer = Buffer.from(imageData, "base64");
        const filename = `${Date.now()}.png`;
        fs.writeFileSync(`./public/files/${filename}`, buffer);
        console.log(`Image saved as ${filename}.png`);
        siteData.hero.visualType = "image";
        siteData.hero.visualFile = filename;
        heroFinished = true;
      }
    }
  } catch (err) {
    heroFinished = true;
    siteData.hero.visualType = "image";
    siteData.hero.visualFile = "";
    console.log("Error generating image.");
  }

  console.log("Generating image for hero background...");
  try {
    const heroResponse2 = await model.generateContent(
      `${siteData.hero.backgroundContent}. Dominated by shades of hex color ${siteData.backgroundColor[0]} and ${siteData.backgroundColor[1]}. Generate 1 image only.`
    );
    for (const part of heroResponse2.response.candidates[0].content.parts) {
      // Based on the part type, either show the text or save the image
      if (part.text) {
        console.log(part.text);
      } else if (part.inlineData) {
        const imageData = part.inlineData.data;
        const buffer = Buffer.from(imageData, "base64");
        const filename = `${Date.now()}.png`;
        fs.writeFileSync(`./public/files/${filename}`, buffer);
        console.log(`Image saved as ${filename}.png`);
        siteData.hero.backgroundType = "image";
        siteData.hero.backgroundContent = filename;
      }
    }
  } catch (err) {
    siteData.hero.backgroundType = "image";
    siteData.hero.backgroundContent = "";
    console.log("Error generating image.");
  }

  // about
  console.log("Generating image for about visual...");
  try {
    const aboutResponse = await model.generateContent(
      `${siteData.about.visualFile}. Dominated by shades of hex color ${siteData.backgroundColor[0]} and ${siteData.backgroundColor[1]}. Generate 1 image only.`
    );
    for (const part of aboutResponse.response.candidates[0].content.parts) {
      // Based on the part type, either show the text or save the image
      if (part.text) {
        console.log(part.text);
      } else if (part.inlineData) {
        const imageData = part.inlineData.data;
        const buffer = Buffer.from(imageData, "base64");
        const filename = `${Date.now()}.png`;
        fs.writeFileSync(`./public/files/${filename}`, buffer);
        console.log(`Image saved as ${filename}.png`);
        siteData.about.visualType = "image";
        siteData.about.visualFile = filename;
      }
    }
  } catch (err) {
    siteData.about.visualType = "image";
    siteData.about.visualFile = "";
    console.log("Error generating image.");
  }

  // features
  siteData.about.features = await Promise.all(
    siteData.about.features.map(async (feature, index) => {
      console.log(`Generating image for about feature #${index + 1}...`);
      try {
        const featureResponse = await model.generateContent(
          `${feature.visualFile}. Dominated by shades of hex color ${siteData.backgroundColor[0]} and ${siteData.backgroundColor[1]}. Generate 1 image only.`
        );
        for (const part of featureResponse.response.candidates[0].content
          .parts) {
          // Based on the part type, either show the text or save the image
          if (part.text) {
            console.log(part.text);
          } else if (part.inlineData) {
            const imageData = part.inlineData.data;
            const buffer = Buffer.from(imageData, "base64");
            const filename = `${Date.now()}.png`;
            fs.writeFileSync(`./public/files/${filename}`, buffer);
            console.log(`Image saved as ${filename}.png`);
            return {
              ...feature,
              backgroundType: "color",
              backgroundContent: siteData.backgroundColor[0],
              visualType: "image",
              visualFile: filename,
            };
          }
        }
      } catch (err) {
        console.log("Error generating image.");
        return {
          ...feature,
          backgroundType: "color",
          backgroundContent: siteData.backgroundColor[0],
          visualType: "image",
          visualFile: "",
        };
      }

      return feature;
    })
  );

  // tokenomics
  siteData.tokenomics.fees = await Promise.all(
    siteData.tokenomics.fees.map(async (fee, index) => {
      console.log(`Generating image for tokenomics fee #${index + 1}...`);
      try {
        const feeResponse = await model.generateContent(
          `${fee.visualFile}. Dominated by shades of hex color ${siteData.backgroundColor[0]} and ${siteData.backgroundColor[1]}. Generate 1 image only.`
        );
        for (const part of feeResponse.response.candidates[0].content.parts) {
          // Based on the part type, either show the text or save the image
          if (part.text) {
            // console.log(part.text);
          } else if (part.inlineData) {
            const imageData = part.inlineData.data;
            const buffer = Buffer.from(imageData, "base64");
            const filename = `${Date.now()}.png`;
            fs.writeFileSync(`./public/files/${filename}`, buffer);
            console.log(`Image saved as ${filename}.png`);
            return {
              ...fee,
              backgroundType: "image",
              backgroundContent: filename,
            };
          }
        }
      } catch (err) {
        console.log("Error generating image.");
        return {
          ...fee,
          backgroundType: "image",
          backgroundContent: "",
        };
      }

      return fee;
    })
  );

  // roadmap
  siteData.roadmap.phases = await Promise.all(
    siteData.roadmap.phases.map(async (phase, index) => {
      console.log(`Generating image for roadmap phase #${index + 1}...`);
      try {
        const phaseResponse = await model.generateContent(
          `${phase.visualFile}. Dominated by shades of hex color ${siteData.backgroundColor[0]} and ${siteData.backgroundColor[1]}. Generate 1 image only.`
        );
        for (const part of phaseResponse.response.candidates[0].content.parts) {
          // Based on the part type, either show the text or save the image
          if (part.text) {
            // console.log(part.text);
          } else if (part.inlineData) {
            const imageData = part.inlineData.data;
            const buffer = Buffer.from(imageData, "base64");
            const filename = `${Date.now()}.png`;
            fs.writeFileSync(`./public/files/${filename}`, buffer);
            console.log(`Image saved as ${filename}.png`);
            return { ...phase, visualType: "image", visualFile: filename };
          }
        }
      } catch (err) {
        console.log("Error generating image.");
        return { ...phase, visualType: "image", visualFile: "" };
      }

      return phase;
    })
  );

  res.status(200).json({ site: siteData });
};
