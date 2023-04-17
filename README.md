# Inteli-Fridge
### A tool that tackles food waste by suggesting meals based on what's in your fridge
https://devpost.com/software/intelli-fridge?ref_content=user-portfolio&ref_feature=in_progress
## Inspiration
Did you know that one-third of all food produced in the world goes to waste? That's a shocking statistic, considering that there are still millions of people who are starving. This is why we wanted to create an application that can help empower us reducing food waste.

## What it does
IntelliFridge utilizes a Deep Learning Computer Vision model that takes a live feed of your fridge to keeps track of all your food and ingredients. It then uses Respell's OpenAI integration to generate recipes tailored for you based on the ingredients you have on hand.

## How we built it
- For our Deep Learning model, we used **Roboflow** to generate a big labeled dataset. Then we use **Amazon SageMaker** and **Ultralytics' YOLOv5** to train the model. 
-  We used **Respell's** integration of **OpenAI's GPT-3** and **DallE-2** to generate recipes and enticing thumbnails for what the meals could look like.
- We created designs using **Figma**, then built the mobile app using **React Native** and **Expo**. The app calls on a custom API deployed on **Railway** that integrates all the services together.

## Challenges we ran into
- Creating a dataset (over 1000 labeled data) to train our computer vision model, due to no existing datasets. 
- Deploying the YOLOv5 model on AWS' Lambda and S3 bucket, wasn't able to do it so we decided to run the model locally which only able to do inference only 3 frame-per-second(fps) instead of 30 fps.
- Deploying the API
  - Tried 5 different AWS products before getting a successful deployment
- API performance issues
  - Respell made it easy to switch between models so we were able to iterate quickly on Spells to observe tradeoffs of speed vs. quality with other models. 
  - Ex: GPT4 was unbearably slow (never actually got a response...), GPT3.5 was slow but okay (~1 min recipe generations), GPT3 was a little faster (40-50s) but not worth the obvious drop in quality. We made similar observations for DALL-E vs Kavinsky for image to text generation.
  - In the end, we decided to cache results so we aren't making these expensive calls if they aren't needed
- Creating good prompts for images and recipes
   - We went through 20-30 prompts before settling on the ones we're using now.
  - We used resources like Learnprompting.com for inspiration

## Accomplishments that we're proud of
Using OpenAI, we were able to seamlessly integrate the front end and back end and pass all of the expected data. 
## What we learned
- Using Respell for quick OpenAI's access to GPT-3 model and DALLE
- Create datasets that the AI can train on with high accuracy
- Train our AI model using AWS SageMaker.

## What's next for IntelliFridge
- Restructuring the API to generate recipes in parallel, increasing speed
- Taking picture of real fridge instead of virtual mock-up
