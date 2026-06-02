
# coding: utf-8

# In[1]:


import pandas as pd


# In[2]:


get_ipython().system('ls')


# In[3]:


csv = pd.read_csv("flare_city_pop.csv")


# In[12]:


reqd = csv.sort_values(by = ["value"], ascending = False).drop_duplicates().head(250)


# In[14]:


reqd.to_csv("flare_city_pop_top250.csv")

