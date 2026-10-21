# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy project file and restore
COPY ["RhineAgent.TestWeb/RhineAgent.TestWeb.csproj", "RhineAgent.TestWeb/"]
RUN dotnet restore "RhineAgent.TestWeb/RhineAgent.TestWeb.csproj"

# Copy all source files and publish release
COPY . .
WORKDIR "/src/RhineAgent.TestWeb"
RUN dotnet publish "RhineAgent.TestWeb.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

EXPOSE 8080
EXPOSE 10000

ENV ASPNETCORE_HTTP_PORTS=10000
ENV ASPNETCORE_ENVIRONMENT=Production

COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "RhineAgent.TestWeb.dll"]
