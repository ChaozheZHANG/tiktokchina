
######################################################
######################################################
######################################################

library(jsonlite)

# Use the readLines function to read the file content
json_data <- suppressWarnings(readLines(file.choose()))
json_data1 <- suppressWarnings(readLines(file.choose()))
json_data2 <- suppressWarnings(readLines(file.choose()))
json_data3 <- suppressWarnings(readLines(file.choose()))

# Use the fromJSON function to convert JSON data to data.frame
df <- fromJSON(json_data)
df1 <- fromJSON(json_data1)
df2 <- fromJSON(json_data2)
df3 <- fromJSON(json_data3)

# View data
print(df)   #version1：a version where only the `external intervention' design intervention is deployed
print(df1)   #version2：a version where only the `internal intervention' design intervention is deployed
print(df2)    #version3：a version where both the `external intervention' and the `internal intervention' design interventions are fully deployed
print(df3)     #version4：an original version without all four design interventions


# Calculate the video viewing time of df
getVideoTime_df <- function(df) {
  total_time <- 0
  
  for(i in 1:(nrow(df) - 1)) {
    if(df$event[i] == 'BrowseProductPage') {
      total_time <- total_time + df$timestamp[i + 1] - df$timestamp[i]
    }
  }
  
  return(timestamp2mmss(total_time))
}

# Calculate the video viewing time of df1
getVideoTime_df1 <- function(df1) {
  total_time <- 0
  
  for(i in 1:(nrow(df1) - 1)) {
    if(df1$event[i] == 'BrowseProductPage') {
      total_time <- total_time + df1$timestamp[i + 1] - df1$timestamp[i]
    }
  }
  
  return(timestamp2mmss(total_time))
}

# Calculate the video viewing time of df2
getVideoTime_df2 <- function(df2) {
  total_time <- 0
  
  for(i in 1:(nrow(df2) - 1)) {
    if(df2$event[i] == 'BrowseProductPage') {
      total_time <- total_time + df2$timestamp[i + 1] - df2$timestamp[i]
    }
  }
  
  return(timestamp2mmss(total_time))
}

# Calculate the video viewing time of df3
getVideoTime_df3 <- function(df3) {
  total_time <- 0
  
  for(i in 1:(nrow(df3) - 1)) {
    if(df3$event[i] == 'BrowseProductPage') {
      total_time <- total_time + df3$timestamp[i + 1] - df3$timestamp[i]
    }
  }
  
  return(timestamp2mmss(total_time))
}


# Calculate the usage time of df
getUsageTime_df <- function(df) {
  usage_time <- df$timestamp[nrow(df)] - df$timestamp[1]
  return(timestamp2mmss(usage_time))
}

# Calculate the usage time of df1
getUsageTime_df1 <- function(df1) {
  usage_time <- df1$timestamp[nrow(df1)] - df1$timestamp[1]
  return(timestamp2mmss(usage_time))
}

# Calculate the usage time of df2
getUsageTime_df2 <- function(df2) {
  usage_time <- df2$timestamp[nrow(df2)] - df2$timestamp[1]
  return(timestamp2mmss(usage_time))
}

# Calculate the usage time of df3
getUsageTime_df3 <- function(df3) {
  usage_time <- df3$timestamp[nrow(df3)] - df3$timestamp[1]
  return(timestamp2mmss(usage_time))
}


# Calculate video viewing time and usage time in seconds
getVideoTimeSeconds <- function(video_time_mmss) {
  video_time_seconds <- mmss2seconds(video_time_mmss)
  return(video_time_seconds)
}

getUsageTimeSeconds <- function(usage_time_mmss) {
  usage_time_seconds <- mmss2seconds(usage_time_mmss)
  return(usage_time_seconds)
}

# Calculate the video viewing time and usage time of df
video_time_df <- getVideoTime_df(df)
usage_time_df <- getUsageTime_df(df)

# Calculate the video viewing time and usage time of df1
video_time_df1 <- getVideoTime_df1(df1)
usage_time_df1 <- getUsageTime_df1(df1)

# Calculate the video viewing time and usage time of df2
video_time_df2 <- getVideoTime_df2(df2)
usage_time_df2 <- getUsageTime_df2(df2)

# Calculate the video viewing time and usage time of df3
video_time_df3 <- getVideoTime_df3(df3)
usage_time_df3 <- getUsageTime_df3(df3)

# Calculate the ratio
ratio_df <- getVideoTimeSeconds(video_time_df) / getUsageTimeSeconds(usage_time_df)
ratio_df1 <- getVideoTimeSeconds(video_time_df1) / getUsageTimeSeconds(usage_time_df1)
ratio_df2 <- getVideoTimeSeconds(video_time_df2) / getUsageTimeSeconds(usage_time_df2)
ratio_df3 <- getVideoTimeSeconds(video_time_df3) / getUsageTimeSeconds(usage_time_df3)

#Print scale
print(paste("The ratio of df:", ratio_df))
print(paste("The ratio of df1:", ratio_df1))
print(paste("The ratio of df2:", ratio_df2))
print(paste("The ratio of df3:", ratio_df3))


#Create product price data frame
products <- data.frame(id = c('0','1', '2', '3', '4', '5', '6', '7', '8','9'),
                       price = c(169, 1299, 399, 379, 64.9, 42.9, 98, 59.8, 84, 0 ))

#It receives a data frame and column names as input.
#If the column exists, it will try to convert it to characters;
#If the column does not exist, it will create a new column and set all values to 0

convert_or_create_column <- function(a, column_name) {
  if (column_name %in% names(a)) {
    a[[column_name]] <- as.character(a[[column_name]])
  } else {
    a[[column_name]] <- 9
  }
  return(a)
}

df <- convert_or_create_column(df, "productId")
df1 <- convert_or_create_column(df1, "productId")
df2 <- convert_or_create_column(df2, "productId")
df3 <- convert_or_create_column(df3, "productId")

#Convert productId to character type for matching
#df$productId <- as.character(df$productId)
#df1$productId <- as.character(df1$productId)
#df2$productId <- as.character(df2$productId)
#df3$productId <- as.character(df3$productId)

# Calculate the total price of the purchase event in df
df_purchase <- df[df$event == 'purchase',]
df_total_price <- sum(products$price[match(df_purchase$productId, products$id)])

# Calculate the total price of the purchase event in df1
df1_purchase <- df1[df1$event == 'purchase',]
df1_total_price <- sum(products$price[match(df1_purchase$productId, products$id)])

# Calculate the total price of the purchase event in df2
df2_purchase <- df2[df2$event == 'purchase',]
df2_total_price <- sum(products$price[match(df2_purchase$productId, products$id)])

# Calculate the total price of the purchase event in df3
df3_purchase <- df3[df3$event == 'purchase',]
df3_total_price <- sum(products$price[match(df3_purchase$productId, products$id)])

# print results
print(paste("The total price of the purchase event in df: ", df_total_price))
print(paste("The total price of the purchase event in df1:", df1_total_price))
print(paste("The total price of the purchase event in df2:", df2_total_price))
print(paste("The total price of the purchase event in df3: ", df3_total_price))

# Total wallet amount
total_money <- 3000

# Calculate remaining amount
remaining_money_df <- total_money - df_total_price
remaining_money_df1 <- total_money - df1_total_price
remaining_money_df2 <- total_money - df2_total_price
remaining_money_df3 <- total_money - df3_total_price

# Calculate the remaining amount ratio
remaining_ratio_df <- remaining_money_df / total_money
remaining_ratio_df1 <- remaining_money_df1 / total_money
remaining_ratio_df2 <- remaining_money_df2 / total_money
remaining_ratio_df3 <- remaining_money_df3 / total_money

event_counts_df <- table(df$event)
event_counts_df1 <- table(df1$event)
event_counts_df2 <- table(df2$event)
event_counts_df3 <- table(df3$event)

# Get all events
all_events <- Reduce(union, list(names(event_counts_df), names(event_counts_df1), names(event_counts_df2), names(event_counts_df3)))

# Create a data frame containing all events
result <- data.frame(Event = all_events)

# Add the count of df
result$Count_df <- event_counts_df[match(result$Event, names(event_counts_df))]
result$Count_df[is.na(result$Count_df)] <- 0  # 将NA替换为0

# Add the count of df1
result$Count_df1 <- event_counts_df1[match(result$Event, names(event_counts_df1))]
result$Count_df1[is.na(result$Count_df1)] <- 0  # 将NA替换为0

# Add the count of df2
result$Count_df2 <- event_counts_df2[match(result$Event, names(event_counts_df2))]
result$Count_df2[is.na(result$Count_df2)] <- 0  # 将NA替换为0

# Add the count of df3
result$Count_df3 <- event_counts_df3[match(result$Event, names(event_counts_df3))]
result$Count_df3[is.na(result$Count_df3)] <- 0  # 将NA替换为0


# Add the total price of purchase events in df, df1, df2, df3
result$TotalPrice_df <- ifelse(result$Event == "purchase", df_total_price, NA)
result$TotalPrice_df1 <- ifelse(result$Event == "purchase", df1_total_price, NA)
result$TotalPrice_df2 <- ifelse(result$Event == "purchase", df2_total_price, NA)
result$TotalPrice_df3 <- ifelse(result$Event == "purchase", df3_total_price, NA)


# Add the price difference of the purchase event in df, df1, df2, df3 and the proportion of the price difference to the overall usage
result$RemainingMoney_df <- ifelse(result$Event == "purchase", remaining_money_df, NA)
result$RemainingMoney_df1 <- ifelse(result$Event == "purchase", remaining_money_df1, NA)
result$RemainingMoney_df2 <- ifelse(result$Event == "purchase", remaining_money_df2, NA)
result$RemainingMoney_df3 <- ifelse(result$Event == "purchase", remaining_money_df3, NA)

result$RemainingRatio_df <- ifelse(result$Event == "purchase", remaining_ratio_df, NA)
result$RemainingRatio_df1 <- ifelse(result$Event == "purchase", remaining_ratio_df1, NA)
result$RemainingRatio_df2 <- ifelse(result$Event == "purchase", remaining_ratio_df2, NA)
result$RemainingRatio_df3 <- ifelse(result$Event == "purchase", remaining_ratio_df3, NA)


#Add other information
result$VideoTime_df <- getVideoTime_df(df)
result$UsageTime_df <- getUsageTime_df(df)
result$VideoTime_df1 <- getVideoTime_df1(df1)
result$UsageTime_df1 <- getUsageTime_df1(df1)
result$VideoTime_df2 <- getVideoTime_df1(df2)
result$UsageTime_df2 <- getUsageTime_df1(df2)
result$VideoTime_df3 <- getVideoTime_df1(df3)
result$UsageTime_df3 <- getUsageTime_df1(df3)

result$Ratio_df <- ratio_df
result$Ratio_df1 <- ratio_df1
result$Ratio_df2 <- ratio_df2
result$Ratio_df3 <- ratio_df3

print(result)


######################################################
######################################################
######################################################



install.packages("tidyverse")
library(tidyverse)

result_long <- result %>%
  gather(key = "variable", value = "value", -Event) %>%
  separate(variable, into = c("variable", "version"), sep = "_") %>%
  spread(key = "variable", value = "value")

#Interested in specific versions (df/df1/df2/df3)
result_selected_df <- result_selected %>%
  filter(version == "df")

#Add switch display for internal and external controls
result_long <- result_long %>%
  mutate(ExternalControl = ifelse(version %in% c("df", "df2"), "on", "off"),
         InternalControl = ifelse(version %in% c("df1", "df2"), "on", "off"))

#View all sorted results and filter the columns of interest
result_selected <- result_long %>%
  select(Event, version, Count = Count, ExternalControl,InternalControl,VideoTime = VideoTime, UsageTime = UsageTime, TimeRatio = Ratio, RemainingMoney = RemainingMoney, RemainingRatio = RemainingRatio)
result_selected





######################################################
######################################################
######################################################


# save data

saveRDS(result_selected, file = "result1.rds")
#saveRDS(result_selected, file = "result2.rds")

result1 <- readRDS("result1.rds")
#result2 <- readRDS("result2.rds")
#result3 <- readRDS("result3.rds")

#results_list <- list(user1 = result1, user2 = result2，user3 = result3)
#results_list

#put result from 1 to 20




######################################################
######################################################
######################################################



# Install the package if not already installed
if (!require(magrittr)) install.packages("magrittr")
# Load the package
library(magrittr)
# Install the package if not already installed
if (!require(dplyr)) install.packages("dplyr")
# Load the package
library(dplyr)
# Install the package if not already installed
if (!require(purrr)) install.packages("purrr")
# Load the package
library(purrr)

files <- paste0("result", 1:20, ".rds")

data_combined <- files %>% 
  map(readRDS) %>% 
  bind_rows(.id = "user")


######################################################
######################################################
######################################################

# Add 'BrowseWallet' column
data_combined$BrowseWallet <- ifelse(data_combined$version %in% c('df1', 'df2'), 'on', 'off')
# Replace non-numeric characters with nothing
data_combined$UsageTime <- gsub("[^0-9:]", "", data_combined$UsageTime)
data_combined$VideoTime <- gsub("[^0-9:]", "", data_combined$VideoTime)
# Then do the conversion, Convert 'UsageTime' from HH:MM to number of minutes
data_combined$UsageTime <- sapply(strsplit(as.character(data_combined$UsageTime), ":"), function(x) (60*as.numeric(x[1]) + as.numeric(x[2]))/60)
# Convert 'VideoTime' from HH:MM to number of minutes
data_combined$VideoTime <- sapply(strsplit(as.character(data_combined$VideoTime), ":"), function(x) (60*as.numeric(x[1]) + as.numeric(x[2]))/60)

######################################################
##first part：Visualizing the wallet's balances

# Create a new data frame that only contains information about the "purchase" event
purchase_df <- data_combined[data_combined$Event == "purchase",]
# Update the original data frame with the new data frame
data_combined <- merge(data_combined, purchase_df[, c("user", "version", "RemainingMoney", "RemainingRatio")], 
                       by = c("user", "version"), suffixes = c("", ".purchase"))
# Use the RemainingMoney and RemainingRatio of the "purchase" event to populate the corresponding fields of other events
data_combined$RemainingMoney[is.na(data_combined$RemainingMoney)] <- data_combined$RemainingMoney.purchase[is.na(data_combined$RemainingMoney)]
data_combined$RemainingRatio[is.na(data_combined$RemainingRatio)] <- data_combined$RemainingRatio.purchase[is.na(data_combined$RemainingRatio)]
# Delete columns no longer needed
data_combined <- data_combined[, !names(data_combined) %in% c("RemainingMoney.purchase", "RemainingRatio.purchase")]
# Spend money is set to 0.0001 balance
data_combined$RemainingMoney <- ifelse(data_combined$RemainingMoney < 0, 0.0001, data_combined$RemainingMoney)
data_combined$RemainingRatio <- ifelse(data_combined$RemainingRatio < 0, 0.0001, data_combined$RemainingRatio)
# Use the mutate function of the dplyr package to add new columns
data_combined$TimeRatio <- as.numeric(data_combined$TimeRatio)
data_combined <- data_combined %>%
  mutate(PurchaseThinkingTimeRatio = 1 - TimeRatio)

######################################################
##the second part：enhancing payment friction

data_combined <- data_combined %>%
  mutate(PayFrictionThink = ifelse(Event %in% c("viewThinkPage"), Count, 0))
data_combined <- data_combined %>%
  mutate(PayFrictionThink_2 = ifelse(Event %in% c("viewThinkPageContinue"), Count, 0))

# Make sure you have installed and loaded the tidyverse package
if(!require(tidyverse)) install.packages('tidyverse')
library(tidyverse)

# Find the value of "viewThinkPage" in Event
thinkpage_values <- data_combined %>%
  filter(Event == "viewThinkPage") %>%
  select(user, version, PayFrictionThink)

# Synchronize this value to different versions corresponding to the same user
data_combined <- data_combined %>%
  left_join(thinkpage_values, by = c("user", "version")) %>%
  mutate(PayFrictionThink = coalesce(PayFrictionThink.y, PayFrictionThink.x)) %>%
  select(-PayFrictionThink.y, -PayFrictionThink.x)

# Find the value of "viewThinkPageContinue" in Event
thinkpage_values <- data_combined %>%
  filter(Event == "viewThinkPageContinue") %>%
  select(user, version, PayFrictionThink_2)

# Synchronize this value to different versions corresponding to the same user
data_combined <- data_combined %>%
  left_join(thinkpage_values, by = c("user", "version")) %>%
  mutate(PayFrictionThink_2 = coalesce(PayFrictionThink_2.y, PayFrictionThink_2.x)) %>%
  select(-PayFrictionThink_2.y, -PayFrictionThink_2.x)

######################################################
#the third part：Prolonging the duration of purchase decision-making

data_combined <- data_combined %>%
  mutate(DelayedPurchase = ifelse(Event %in% "countdown unmounted", Count, 0))

# Make sure you have installed and loaded the tidyverse package
if(!require(tidyverse)) install.packages('tidyverse')
library(tidyverse)

# Find the value of "countdown unmounted" in Event
countdown_values <- data_combined %>%
  filter(Event == "countdown unmounted") %>%
  select(user, version, DelayedPurchase)

# Synchronize this value to different versions corresponding to the same user
data_combined <- data_combined %>%
  left_join(countdown_values, by = c("user", "version")) %>%
  mutate(DelayedPurchase = coalesce(DelayedPurchase.y, DelayedPurchase.x)) %>%
  select(-DelayedPurchase.y, -DelayedPurchase.x)

######################################################
#fourth part：imposing browsing time limits and usage statistics

data_combined <- data_combined %>%
  mutate(Ignoretime = ifelse(Event %in% "ignore", Count, 0))

# Make sure you have installed and loaded the tidyverse package
if(!require(tidyverse)) install.packages('tidyverse')
library(tidyverse)

# Find the value of "ignore" in Event
ignore_values <- data_combined %>%
  filter(Event == "ignore") %>%
  select(user, version, Ignoretime)

# Synchronize this value to different versions corresponding to the same user
data_combined <- data_combined %>%
  left_join(ignore_values, by = c("user", "version")) %>%
  mutate(Ignoretime = coalesce(Ignoretime.y, Ignoretime.x)) %>%
  select(-Ignoretime.y, -Ignoretime.x)

######################################################

print(data_combined)

######################################################
######################################################
######################################################









######################################################
######################################################
######################################################

#Record how many activity records there are in total Activity record
data_combined$Count <- as.numeric(data_combined$Count)
sum_record = sum(data_combined$Count)
sum_record

######################################################

# Subset the data where version is 'df'
df_subset = subset(data_combined, version == 'df')
# Calculate the sum of Count in the subset
count_sum = sum(df_subset$Count)
# Print the result
print(count_sum)

# Subset the data where version is 'df1'
df_subset = subset(data_combined, version == 'df1')
# Calculate the sum of Count in the subset
count_sum = sum(df_subset$Count)
# Print the result
print(count_sum)

# Subset the data where version is 'df2'
df_subset = subset(data_combined, version == 'df2')
# Calculate the sum of Count in the subset
count_sum = sum(df_subset$Count)
# Print the result
print(count_sum)

# Subset the data where version is 'df3'
df_subset = subset(data_combined, version == 'df3')
# Calculate the sum of Count in the subset
count_sum = sum(df_subset$Count)
# Print the result
print(count_sum)

######################################################
######################################################
######################################################












######################################################
######################################################
######################################################

install.packages("openxlsx")
# Load package
library(openxlsx)
# Write data frame to Excel file
write.xlsx(data_combined, "result_data_combined.xlsx")

######################################################
######################################################
######################################################

install.packages("lme4")
install.packages("lmerTest")
install.packages("car")
install.packages("emmeans")
install.packages("multcomp")
install.packages("coin")
install.packages("zoo")
install.packages("scales")
install.packages("effectsize")

#If any of these do not load, try install.packages("lme4") (etc.), then try again
library(lme4)
library(lmerTest)
library(car)
library(emmeans)
library(multcomp)
library(coin)
library(zoo)
library(scales)
library(effectsize)

calculateBetas <- function(model){
  Vcov <- vcov(model, useScale = False)
  betas <- round(fixef(model), 3)#lmer
  se <- round(sqrt(diag(Vcov)), 3)
  zval <- round(betas / se, 3)
  pval <- round(2*pnorm(abs(zval), lower.tail = FALSE), 3)
  ## print everything
  cbind(betas, se, zval, pval)
}


data_combined$Count <- as.numeric(data_combined$Count)# Convert 'Count' column to numeric
data_combined$TimeRatio <- as.numeric(data_combined$TimeRatio)# Convert 'TimeRatio' column to numeric
data_combined$RemainingRatio <- as.numeric(data_combined$RemainingRatio)# Convert 'RemainingRatio' column to numeric
data_combined$RemainingMoney <- as.numeric(data_combined$RemainingMoney)# Convert 'RemainingMoney' column to numeric
data_combined$PurchaseThinkingTimeRatio <- as.numeric(data_combined$PurchaseThinkingTimeRatio)# Convert 'PurchaseThinkingTimeRatio' column to numeric
data_combined$DelayedPurchase <- as.numeric(data_combined$DelayedPurchase)
data_combined$PayFrictionThink <- as.numeric(data_combined$PayFrictionThink)
data_combined$PayFrictionThink_2<- as.numeric(data_combined$PayFrictionThink_2)
data_combined$Ignoretime<- as.numeric(data_combined$Ignoretime)

data_combined$user<- as.factor(data_combined$user) #Participant ID
data_combined$Event <- as.factor(data_combined$Event) #Different Event
data_combined$InternalControl <- as.factor(data_combined$InternalControl) #InternalControl on/off
data_combined$ExternalControl <- as.factor(data_combined$ExternalControl) #ExternalControl on/off
data_combined$version <- as.factor(data_combined$version) #Vesion df/df1/df2/df3
data_combined$BrowseWallet <- as.factor(data_combined$BrowseWallet) #BrowseWallet on/off
data_combined$DelayedPurchase <- as.factor(data_combined$DelayedPurchase)



### Visualizing the wallet's balances

# Run an inverse gaussian model in which the "RemainingRatio" 
# is modeled by whether BrowseWallet is on or off and the Ratio of PurchaseThinkingTime spent on it
# with the participant ID as random variables

data_combined.ig <- glmer(formula = RemainingRatio ~ BrowseWallet + PurchaseThinkingTimeRatio + (1|user), family = inverse.gaussian(link = "log"), data = data_combined) 
# Collected several subjects to explore the RemainingRatio of different BrowseWallets and different thinking times.
# Build a null model (only random intercepts)

summary(data_combined.ig)
# Anova(data_combined.ig, type = "3")
calculateBetas(data_combined.ig)







###enhancing payment friction

#data_combined2.ig <- glmer(formula = RemainingRatio ~ InternalControl + PayFrictionThink*PayFrictionThink_2 + (1|user), family = inverse.gaussian(link = "log"), data = data_combined)
#summary(data_combined2.ig)
data_combined2.ig <- glmer(formula = RemainingRatio ~ PayFrictionThink*PayFrictionThink_2 + (1|user), family = inverse.gaussian(link = "log"), data = data_combined)
summary(data_combined2.ig)

#data_combined2.ig <- glmer(formula = RemainingRatio ~ PayFrictionThink+ TimeRatio+ (1|user), family = inverse.gaussian(link = "log"), data = data_combined)
#summary(data_combined2.ig)

# Anova(data_combined2.ig, type = "3")
calculateBetas(data_combined2.ig)





###Prolonging the duration of purchase decision-making

data_combined$RemainingMoney <- ifelse(data_combined$RemainingMoney < 0, 0.0001, data_combined$RemainingMoney)
data_combined$RemainingRatio <- ifelse(data_combined$RemainingRatio < 0, 0.0001, data_combined$RemainingRatio)
data_combined$DelayedPurchase <- as.numeric(data_combined$DelayedPurchase)

#data_combined3.ig <- glmer(formula = RemainingRatio ~ DelayedPurchase + UsageTime + InternalControl + (1|user), family = inverse.gaussian(link = "log"), data = data_combined)
#summary(data_combined3.ig)

data_combined3.ig <- glmer(formula = RemainingRatio ~ DelayedPurchase + PurchaseThinkingTimeRatio + (1|user), family = inverse.gaussian(link = "log"), data = data_combined)
summary(data_combined3.ig)

#data_combined3.ig <- glmer(formula = RemainingRatio ~ DelayedPurchase + UsageTime + (1|user), family = inverse.gaussian(link = "log"), data = data_combined)
#summary(data_combined3.ig)

# Anova(data_combined3.ig, type = "3")
calculateBetas(data_combined3.ig)





###imposing browsing time limits and usage statistics

data_combined4.ig <- glmer(formula = RemainingRatio ~ Ignoretime + ExternalControl + TimeRatio + (1|user), family = inverse.gaussian(link = "log"), data = data_combined)
summary(data_combined4.ig)

# Anova(data_combined4.ig, type = "3")
calculateBetas(data_combined4.ig)








#Among them, S people quit Douyin X when they saw the browsing time limit dialog box for the first time.
#Under the condition that ExternalControl is "on", 
#each user contains "ignore" in the Event and the number of rows in which the corresponding count column is equal to 0.

library(dplyr)

data_combined %>%
  filter(ExternalControl == "on", grepl("ignore", Event), Count == 0) %>%
  group_by(user) %>%
  summarise(count = n())

#Statistics The sum of the values in the Count column 
#corresponding to the rows containing "ignore" in the Event column in data_combined:

library(dplyr)

data_combined %>%
  filter(grepl("ignore", Event)) %>%
  summarise(total = sum(Count, na.rm = TRUE))














######################################################
######################################################
######################################################

#Friedman test
data <- read.csv(file.choose()) #choose questiondata.csv 
#Convert the first column to factors
data$X <- as.factor(data$X)
#Convert other columns to numeric values
for (i in 2:ncol(data)) {
  data[,i] <- as.numeric(data[,i])
}

# Rename column name
colnames(data) <- c("Group", paste0("Q", 1:13))

# Create an empty data frame to hold the results
results <- data.frame(Group = character(), Question = character(), p_value = numeric(), chi_squared = numeric())

# Perform Kruskal-Wallis test for each question
#for (question in colnames(data)[2:14]) {
#  p_value <- kruskal.test(as.formula(paste0(question, " ~ Group")), data = data)$p.value
#  chi_squared<- kruskal.test(as.formula(paste0(question, " ~ Group")), data = data)$statistic
#  results <- rbind(results, data.frame(Group = "All", Question = question, p_value = p_value, chisq_test = chi_squared))
#}

for (question in colnames(data)[13:14]) {
  p_value <- kruskal.test(as.formula(paste0(question, " ~ Group")), data = data)$p.value
  chi_squared<- kruskal.test(as.formula(paste0(question, " ~ Group")), data = data)$statistic
  results <- rbind(results, data.frame(Group = "All", Question = question, p_value = p_value, chisq_test = chi_squared))
}


# add asterisk
results$stars <- sapply(results$p_value, function(p){
  if (p < 0.001) return('***')
  else if (p < 0.01) return('**')
  else if (p < 0.05) return('*')
  else return('ns')
})

# Reshape data into long format
data_long <- reshape2::melt(data, id.vars = "Group", variable.name = "Question", value.name = "Value")

# Select the "Group" column and the last two columns
data_subset <- data[, c(1, (ncol(data)-1):ncol(data))]
# Use the melt function to convert the data frame from wide format to long format
data_long <- reshape2::melt(data_subset, id.vars = "Group", variable.name = "Question", value.name = "Value")


#Install ggplot2 package
if (!require(ggplot2)) {
  install.packages("ggplot2")
}
# Load the ggplot2 package
library(ggplot2)
# Now you can use the ggplot function
ggplot(data_long, aes(x = Question, y = Value, fill = Group))


# Draw box plot and add asterisks
ggplot(data_long, aes(x = Question, y = Value, fill = Group)) +
  geom_boxplot() +
  geom_text(data = results, aes(x = Question, y = max(data_long$Value+1), label = stars), vjust = 2) +
  theme(axis.text.x = element_text(angle = 90, vjust = 0.5, hjust=1)) +
  labs(title = "Comparison of Scores across Four Groups",
       x = "Question",
       y = "Score",
       fill = "Group")

#see the results
results

# Add decimal p-values to the box plot
#results$p_value_decimal <- sapply(results$p_value, function(x) format.pval(x, eps = 0.0001, digits = 4))

#ggplot(data_long, aes(x = Question, y = Value, fill = Group)) +
#  geom_boxplot() +
#  geom_text(data = results, aes(x = Question, y = min(data_long$Value) - 1, label = paste0("p = ", p_value_decimal)), position = position_dodge(width = 0.75)) +
#  theme(axis.text.x = element_text(angle = 90, vjust = 0.5, hjust=1)) +
#  labs(title = "Comparison of Scores across Four Groups",
#       x = "Question",
#       y = "Score",
#       fill = "Group")


