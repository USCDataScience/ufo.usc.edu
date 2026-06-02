
# coding: utf-8

# In[1]:


import pandas as pd


# In[2]:


csv = pd.read_csv("dui.csv")


# In[6]:


csv["DUI"] = csv["DUI"]*100/csv["DUI"].sum()


# In[14]:


csv["DUI"] = csv["DUI"]*100


# In[20]:


csv["DUI"].sum()


# In[19]:


csv.to_csv("dui1.csv")

