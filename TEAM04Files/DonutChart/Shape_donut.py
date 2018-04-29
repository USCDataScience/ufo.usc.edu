
# coding: utf-8

# In[1]:


import pandas as pd


# In[54]:


csv = pd.read_csv("../../final.csv")
csv


# In[67]:


shape = csv['shape_x']


# In[68]:


shape = shape.to_frame("shape")


# In[69]:


shape['count'] = shape.groupby('shape')['shape'].transform('count')


# In[72]:


shape = shape.drop_duplicates()


# In[83]:


shape1 = shape.sort_values('count',ascending=False).head(22)


# In[84]:


shape1.to_csv("ufo-shape-count.csv")

