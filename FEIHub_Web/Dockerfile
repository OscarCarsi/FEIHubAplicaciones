# Stage 1: Build the application
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env
WORKDIR /FEIHub_Web
COPY . ./
RUN dotnet restore
RUN dotnet publish -c Release -o bin

# Stage 2: Run the application
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /FEIHub_Web
COPY --from=build-env /FEIHub_Web/bin .
ENTRYPOINT [ "dotnet", "FEIHub_Web.dll" ]
