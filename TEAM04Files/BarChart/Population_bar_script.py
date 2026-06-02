
# coding: utf-8

# In[1]:


import pandas as pd


# In[12]:


csv = pd.read_csv("city-pop.csv")


# In[27]:


csv1 = csv.sort_values(by = ["population"], ascending = False).drop_duplicates().head(10)


# In[28]:


csv1 = csv1.sort_values(by = ["city"])


# In[30]:


csv1.to_csv("city-pop-top10.csv")

