# CHI 24 Submission

## Description
This repository contains the submission for the CHI 24, including the source code of the prototype, the dataset of the user study, and the analysis code.

## Abstract
Impulsive purchasing tendencies exist on Douyin, the most popular Chinese social media platform, primarily due to the users’ exposure
to live sales events. This study delved into examining impulsive purchasing behaviour, specifically triggered by external stimuli,
through the lens of the Stimulus-Organism-Response framework model. Thus, our study implemented a tailored Douyin client, namely
Douyin X, that contains four interventions: Visualizing the wallet’s balances, enhancing payment friction, Prolonging the duration
of purchase decision-making, and imposing browsing time limits and usage statistics. Our user study with 20 participants implies
individuals’ impulsive buying due to external stimuli, combined with the proliferation of impulse purchase-promoting designs, which
has led to the excessive prevalence of impulse buying in live e-commerce. Our research offers a comprehensive framework that can
effectively mitigate the likelihood of impulsive purchasing behaviours, specifically from a design-oriented standpoint

## How To Run

```bash
# Install dependencies
$ yarn install

# Run the app (iOS)
$ yarn ios

# Run the app (Android)
$ yarn android
```

## Data
The data is stored in the `data` folder. The source code for the data analysis is `data/compute.R`.

## Acknowledgement
This code is based on [tiktok-clone](https://github.com/matheuscastroweb/tiktok-clone).