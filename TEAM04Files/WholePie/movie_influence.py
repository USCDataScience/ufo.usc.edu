
# coding: utf-8

# In[1]:


import pandas as pd


# In[15]:


file1 = file.drop(file.columns[[0,1,2,3,4,5,6,7,8,10,11,13,14,15]],axis=1)


# In[17]:


file2 = file1.groupby('state').count()


# In[21]:


file2.to_csv('movie_influence.csv')

