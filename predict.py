import logging
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.cluster import DBSCAN
from sklearn import metrics
from sklearn.preprocessing import StandardScaler
import os
from sklearn.preprocessing import MinMaxScaler
from openai import OpenAI
import hiplot as hip
import json
from sklearn.cluster import KMeans

class ModelServe:

    def __init__(self):
        """
        Initialization method for the deployment. Invoked once during deployment startup.
        Load your ML models here and use them in the predict function for serving individual requests.
        """
        logging.info('Initializing models for serving prediction requests')
        df = pd.read_csv('food-footprints.csv')
        filtered_df = df.iloc[:,[0,4,8,12,16]]
        columns = filtered_df.columns
        scaler = MinMaxScaler()
        normalized_df = scaler.fit_transform(filtered_df)
        normalized_df = pd.DataFrame(normalized_df, columns=columns)
        Kmean = KMeans(n_clusters=3, random_state=42)
        Kmean.fit(normalized_df)
        self.model = Kmean    
        self.filtered_df = filtered_df    

    def predict(self, request):
        """
        Return model prediction for a request. Invoked for every individual request.
        Implement this method.

        Arguments:
        request -- a Python dictionary representing JSON body of a prediction request.
        """
        logging.info('Processing the prediction request')

        # Extracting 'food_item' from the request
        food_item = request.get('food_item')

        input_df = self.filtered_df[self.filtered_df['Entity'].str.lower() == food_item.lower()]

        os.environ['OPENAI_API_KEY'] = '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'
        if(input_df.shape[0] == 0):
            client = OpenAI()
            
            completion = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": """ I want you to give me GHG emissions(kilograms CO2), water use(liters), land use(meter square), water scarcity(liters) and eutrophication values(gPO4)(each per kg) for any given food product in JSON format. Example:
                    {emissions: 0.387011
                    land_use: 7.683045
                    eutrophication: 8.723075
                    water_scarcity: 402211.960769
                    water_use: 6846.472597}
                    If you are given a food product, calculate these attributes by averaging the values for each of the ingredients used to make that food product."""},
                    {"role": "user", "content": food_item}
                ]
            )
            output = completion.choices[0].message.content
            output_dict = json.loads(output)

            emissions = output_dict["emissions"]
            land_use = output_dict["land_use"]
            eutrophication = output_dict["eutrophication"]
            water_scarcity = output_dict["water_scarcity"]
            water_withdrawals = output_dict["water_use"]
            
            # Convert the values into a NumPy array and reshape it
            input_df = np.array([emissions, land_use, eutrophication, water_scarcity, water_withdrawals]).reshape(1, -1)
            pred = self.model.predict(input_df)


        model_output = pred
        return model_output
