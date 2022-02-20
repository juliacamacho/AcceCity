# AcceCity

# Inspiration

Many cities in the United States are still severely behind on implementing infrastructure improvements to meet ADA (Americans with Disabilities Act) accessibility standards. Though 1 in 7 people in the US have a mobility-related disability, research has found that 65% of curb ramps and 48% of sidewalks are not accessible, and only 13% of state and local governments have transition plans for implementing improvements (Eisenberg et al, 2020). To make urban living accessible to all, cities need to upgrade their public infrastructure, starting with identifying areas that need the most improvement according to ADA guidelines. However, having city dispatchers travel and view every single area of a city is time consuming, expensive, and tedious. We aimed to utilize available data from Google Maps to streamline and automate the analysis of city areas for their compliance with ADA guidelines.

# What AcceCity does

AcceCity provides a machine learning-powered mapping platform that enables cities, urban planners, neighborhood associations, disability activists, and more to identify key areas to prioritize investment in. AcceCity identifies both problematic and up-to-standards spots and provides an interactive, dynamic map that enables on-demand regional mapping of accessibility concerns and improvements and street views of sites.

### Interactive dynamic map

AcceCity implements an interactive map, with city and satellite views, that enables on-demand mapping of accessibility concerns and improvements. Users can specify what regions they want to analyze, and a street view enables viewing of specific spots.

### Detailed accessibility concerns

AcceCity calculuates scores for each concern based on ADA standards in four categories: general accessibility, walkability, mobility, and parking. Examples of the features we used for each of these categories include the detection of ramps in front of raised entrances, the presence of sidewalks along roads, crosswalk markings at street intersections, and the number of handicap-reserved parking spots in parking lots. In addition, suggestions for possible solutions or improvements are provided for each concern.

### Accessibility scores

AcceCity auto-generates metrics for areas by computing regional scores (based on the scan area selected by the user) by category (general accessibility, walkability, mobility, and parking) in addition to an overall composite score.

# How we built it

### Frontend

We built the frontend using React with TailwindCSS for styling. The interactive dynamic map was implemented using the Google Maps API, and all map and site data are updated in real-time from Firebase using listeners.

New scan data are also instantly saved to the cloud for future reuse.

### Machine learning backend

First, we used the Google Maps API to send images of the street view to the backend. We looked for handicapped parking, sidewalks, disability ramps, and crosswalks and used computer vision, by custom-fitting a zero shot learning model called CLIP from OpenAI, to automatically detect those objects from the images. We tested the model using labeled data from Scale Rapid API.

After running this endpoint on all images in a region of interest, users can calculate a metric that represents the accessibility of that area to people with disabilities. We call that metric the ADA score, which can be good, average, or poor. (Regions with a poor ADA score should be specifically targeted by city planners to increase its accessibility.) We calculated this ADA score based on features such as the number of detected ramps, handicapped parking spaces, crosswalks, and sidewalks from the google maps image analysis discussed previously, in addition to using the number of accidents per year recorded in that area. We trained a proof of concept model using mage.ai, which provides an intuitive and high-level way to train custom models.

## Challenges we ran into

Applying ML to diverse urban images, especially since it’s so “in the wild”
Lack of general ML models for accessibility prediction
Developing methods for calculating representative / accurate metrics
Running ML model on laptops: very computationally expensive
Accomplishments that we're proud of

We developed the first framework that connects Google Maps images with computer vision models to analyze the cities we live in.
We developed the first computer vision framework/model aimed to detect objects specific for people with disabilities
We integrated the Google Maps API with a responsive frontend that allows users to view their areas of interest and enter street view to see the results of the model.

## What we learned

We learned how to integrate the Google Maps API for different purposes.
We learned how to customize the OpenAI zero shot learning for specific tasks.
How to use Scale Rapid API to label images
How to use Mage.ai to quickly and efficiently train classification models.

## What's next for AcceCity

Integrating more external data (open city data): public buildings, city zoning, locations of social services, etc.
Training the machine learning models with more data collected in tandem with city officials.

## Ethical considerations

As we develop technology made to enable and equalize the playing field for all people, it is important for us to benchmark our efforts against sustainable and ethical products. Accecity was developed with several ethical considerations in mind to address a potentially murky future at the intersection of everyday life (especially within our civilian infrastructure) and digital technology.

A primary lens we used to assist in our data collection and model training efforts was ensuring that we collected data points from a spectrum of different fields. We attempted to incorporate demographic, socioeconomic, and geopolitical diversity when developing our models to detect violations of the ADA. This is key, as studies have shown that ADA violations disproportionately affect socioeconomically disadvantaged groups, especially among Black and brown minorities.

By incorporating a diverse spectrum of information into our analysis, our outputs can also better serve the city and urban planners seeking to create more equitable access to cities for persons with disabilities and improve general walkability metrics.

At its core, AcceCity is meant to help urban planners design better cities. However, given the nature of our technology, it casts a wide, automatic net over certain regions. The voice of the end population is never heard, as all of our suggestion points are generated via Google Maps. In future iterations of our product, we would focus on implementing features that allow everyday civilians affected by ADA violations and lack of walkability to suggest changes to their cities or report concerns. People would have more trust in our product if they believe and see that it is truly creating a better city and neighborhood around them.

As we develop a technology that might revolutionize how cities approach urban planning and infrastructure budget, it is also important to consider how bad actors might aim to abuse our platform. The first and primary red flag is from the stance of someone who might abuse disability and reserved parking and actively seeks out those reserved spaces, when they have not applied for a disability placard, excluding those who need those spaces the most. Additionally, malicious actors might use the platform to scrape data on cities and general urban accessibility features and sell that data to firms that would want these kinds of metrics, which is why we firmly commit to securing our and never selling our data to third parties.

One final consideration for our product is its end goal: to help cities become more accessible for all. Once we achieve this goal, even on an individual concern by concern basis we should come back to cities and urban planners with information on the status of their improvements and more details on other places that they can attempt to create more equitable infrastructure.
