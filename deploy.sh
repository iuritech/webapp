#!/bin/bash

# Set Variables
resourceGroupName="tp"
location="francecentral"
WEB_APP_NAME="tonytectos"
GITHUB_REPO_URL="git@github.com:iuritech/webapp.git"
BRANCH="main"
GITHUB_TOKEN="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"

# Configure GitHub deployment using the Personal Access Token
az webapp deployment source config --name $WEB_APP_NAME --resource-group $resourceGroupName --repo-url $GITHUB_REPO_URL --branch $BRANCH --git-token $GITHUB_TOKEN

# Browse to the Web App
az webapp browse --resource-group $resourceGroupName --name $WEB_APP_NAME

