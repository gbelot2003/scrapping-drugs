# Scrapping website Drugs.com 
## How it works.
#### Basically this tool use **Pupeteer** librarie, an e2e tool that works with a headless chromium version, to load the website and avoid the scrapping restriction.

#### We divide the program into four main classes, called steps. 

- **The first step** creates a master list with links taken from the url https://www.drugs.com/drug_information.html, which lists all drugs from A to Z.

- **The second step** generates a new list, with links Aa to Az, Ba to Bz, and so on.

- **The third step** goes through all the lists in the previous step, writing a list with the detail of the urls of all the drugs listed above.

- Lastly, **the fourth** step loops through the list generated in the third and begins to evaluate each page, looping through each p element between the **#dosage id** and the **div.ddc-related-link class** that marks the end of the section. this since the content of the elements are not enclosed in a defined class or div.

- Also, not all pages listed contain the dosage section, so the script evaluates if the #dosage id exists, otherwise it adds a new loop to compensate for the missing page and achieve the assigned number.

## Install
**Clone this github repo.**
- git clone https://github.com/gbelot2003/scrapping-drugs.git
- git@github.com:gbelot2003/scrapping-drugs.git

or unzip the file in any folder.

Download all dependencies libraries and modules with **npm i** or **npm install** command, this will take a while, so be patient.

copy the .example.env to .env file.

`cp .example.env .env`

Inside the .env you can change the time to wait for every page or the loop number for every step, or the wait time for all the loops.
the default time is 3000 (3segs) for loop. 

```
#base url
BASE_URL="https://www.drugs.com"

#Drug Index A to Z, is need to create first list
INI_WEBSITE="https://www.drugs.com/drug_information.html"

#StepTwo loop, if 0 total of url scrapped
#Drug Index A-a to Z-z, is need to create second list
ST_NUMBER=2

#Drug Index Drugs: Ab to Drugs: Zz, is need to create thrid list
#StepThree loops, if 0 total of url scrapped
STR_NUMBER=2 

#Drug details, class dosages on so...
#StepFour loop, if 0 total of url scrapped
SF_NUMBER=10 

# time to wait for every loop in the script
TIME_WAIT=0
```

Then, you can initialiate the process of the script with the next command

`npm run start`

and let the program run until it finishes.


