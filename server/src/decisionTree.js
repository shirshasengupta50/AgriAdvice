
function getAdvice( crop, moisture, pH, temperature, humidity, light ) {
    const thresholds = {
      Tobacco: {
        moisture: {
          min: 40,
          max: 60,
          low: "Irrigate during vegetative growth.",
          high: "Reduce water near harvest for dry curing."
        },
        pH: {
          min: 5.5,
          max: 6.5,
          low: "Apply lime.",
          high: "Add compost or sulfur."
        },
        temperature: {
          min: 20,
          max: 30,
          low: "Delay planting.",
          high: "Water well and monitor leaves."
        },
        humidity: {
          min: 50,
          max: 70,
          low: "Irrigate more.",
          high: "Avoid leaf wetting to prevent diseases."
        },
        light: {
          min: 2,
          max: 11,
          low: "Needs high light for good leaf quality.",
          high: "Slight shading may help in extreme heat."
        }
      },
      Sesame: {
        moisture: { min: 30, max: 50, low: "Water regularly especially at flowering.", high: "Drain excess water; sesame is sensitive to waterlogging." },
        pH: { min: 5.0, max: 8.0, low: "Apply lime to reduce acidity.", high: "Apply gypsum or compost to reduce alkalinity." },
        temperature: { min: 25, max: 35, low: "Delay sowing or choose warmer season.", high: "Mulch and irrigate often." },
        humidity: { min: 40, max: 70, low: "Increase irrigation frequency.", high: "Ensure good airflow to prevent fungal infections." },
        light: { min: 2, max: 11, low: "Ensure full sun exposure.", high: "Shade if scorching." } 
      },
      Sugarcane: {
        moisture: {
          min: 60,
          max: 80,
          low: "Increase irrigation, especially in dry season.",
          high: "Ensure proper drainage to avoid root rot."
        },
        pH: {
          min: 6.0,
          max: 8.0,
          low: "Add lime to raise pH.",
          high: "Use sulfur or organic matter."
        },
        temperature: {
          min: 20,
          max: 35,
          low: "Use early maturing varieties.",
          high: "Maintain adequate water levels."
        },
        humidity: {
          min: 60,
          max: 90,
          low: "Frequent irrigation needed.",
          high: "Improve drainage; monitor for fungal diseases."
        },
        light: {
          min: 2,
          max: 11,
          low: "Ensure 8–10 hours sun.",
          high: "Not an issue."
        }
      },
      Cotton: {
        moisture: {
          min: 40,
          max: 60,
          low: "Water during flowering and boll formation.",
          high: "Prevent waterlogging to avoid root diseases."
        },
        pH: {
          min: 5.5,
          max: 7.5,
          low: "Add lime.",
          high: "Use organic matter to adjust."
        },
        temperature: {
          min: 20,
          max: 30,
          low: "Delay sowing or use early varieties.",
          high: "Water more frequently."
        },
        humidity: {
          min: 50,
          max: 70,
          low: "Irrigate frequently.",
          high: "Monitor pests and diseases (e.g., bollworm)."
        },
        light: {
          min: 2,
          max: 11,
          low: "Ensure open field planting.",
          high: "May increase stress; mulch to protect roots."
        }
      },
      Tea: {
        moisture: {
          min: 50,
          max: 70,
          low: "Irrigate frequently to maintain soil moisture.",
          high: "Avoid water stagnation."
        },
        pH: {
          min: 4.5,
          max: 6.0,
          low: "Add dolomite lime to raise pH slightly.",
          high: "Use acidifying fertilizers."
        },
        temperature: {
          min: 13,
          max: 28,
          low: "Delay plucking; protect plants from frost.",
          high: "Provide partial shade."
        },
        humidity: {
          min: 60,
          max: 90,
          low: "Mist or irrigate.",
          high: "Prune to maintain airflow and prevent disease."
        },
        light: {
          min: 1,
          max: 7,
          low: "Ensure some exposure.",
          high: "Provide shade, as tea is shade-loving."
        }
      },
      Coffee: {
        moisture: {
          min: 50,
          max: 70,
          low: "Irrigate especially during dry months.",
          high: "Ensure slope drainage or raised beds."
        },
        pH: {
          min: 6.0,
          max: 6.5,
          low: "Apply lime.",
          high: "Apply organic acidifiers."
        },
        temperature: {
          min: 18,
          max: 30,
          low: "Protect from cold/frost.",
          high: "Water more; provide shade."
        },
        humidity: {
          min: 60,
          max: 90,
          low: "Increase irrigation.",
          high: "Monitor for fungal issues (e.g., rust)."
        },
        light: {
          min: 1,
          max: 6,
          low: "Partial light is acceptable.",
          high: "Provide shade trees."
        }
      },
      Jute: {
        moisture: {
          min: 60,
          max: 80,
          low: "Provide shallow flooding or irrigation.",
          high: "Avoid water stagnation for too long."
        },
        pH: {
          min: 5.0,
          max: 7.0,
          low: "Apply lime.",
          high: "Add compost."
        },
        temperature: {
          min: 24,
          max: 37,
          low: "Use early maturing varieties.",
          high: "Increase irrigation."
        },
        humidity: {
          min: 60,
          max: 90,
          low: "Mist irrigation can help.",
          high: "Ensure field airflow to reduce disease."
        },
        light: {
          min: 3,
          max: 9,
          low: "Ensure 6–8 hours of sun.",
          high: "Slight shade during peak hours is beneficial."
        }
      },
      Mango: {
        moisture: {
          min: 30,
          max: 60,
          low: "Irrigate, especially during flowering and fruiting.",
          high: "Ensure drainage; mango is drought-tolerant."
        },
        pH: {
          min: 5.5,
          max: 7.5,
          low: "Add lime.",
          high: "Apply compost."
        },
        temperature: {
          min: 21,
          max: 35,
          low: "Protect from cold snaps.",
          high: "Mulch and irrigate more often."
        },
        humidity: {
          min: 50,
          max: 70,
          low: "Regular irrigation.",
          high: "Watch for powdery mildew."
        },
        light: {
          min: 2,
          max: 11,
          low: "Mango needs full sunlight.",
          high: "Ideal for flowering and fruiting."
        }
      },
      Banana: {
        moisture: {
          min: 60,
          max: 80,
          low: "Increase irrigation regularly.",
          high: "Improve drainage to avoid root rot."
        },
        pH: {
          min: 6.0,
          max: 7.5,
          low: "Add lime.",
          high: "Use organic matter or sulfur."
        },
        temperature: {
          min: 20,
          max: 35,
          low: "Protect from frost.",
          high: "Use mulch and frequent watering."
        },
        humidity: {
          min: 60,
          max: 90,
          low: "Mist irrigation may help.",
          high: "Prune leaves to reduce diseases."
        },
        light: {
          min: 2,
          max: 11,
          low: "Requires full sunlight.",
          high: "Thrives in strong sunlight."
        }
      },
      Apple: {
        moisture: {
          min: 40,
          max: 60,
          low: "Irrigate during fruit development.",
          high: "Avoid overwatering; ensure drainage."
        },
        pH: {
          min: 5.5,
          max: 6.5,
          low: "Apply lime.",
          high: "Add compost or sulfur."
        },
        temperature: {
          min: 5,
          max: 24,
          low: "Protect from frost damage.",
          high: "Irrigate and use shade netting."
        },
        humidity: {
          min: 50,
          max: 70,
          low: "Increase irrigation.",
          high: "Prune to maintain airflow."
        },
        light: {
          min: 2,
          max: 11,
          low: "Needs sunlight for good fruit quality.",
          high: "Ideal unless excessive."
        }
      },
      Potato: {
        moisture: {
          min: 50,
          max: 65,
          low: "Irrigate during tuber initiation.",
          high: "Avoid standing water; potato is prone to rot."
        },
        pH: {
          min: 5.2,
          max: 6.4,
          low: "Add lime.",
          high: "Use acidic organic matter."
        },
        temperature: {
          min: 10,
          max: 25,
          low: "Delay planting.",
          high: "Provide mulch and irrigation."
        },
        humidity: {
          min: 50,
          max: 70,
          low: "Increase irrigation.",
          high: "Risk of late blight; use fungicide if needed."
        },
        light: {
          min: 3,
          max: 8,
          low: "Needs 6–8 hours sunlight.",
          high: "May lead to greening of tubers; hill the plants."
        }
      },
      Onion: {
        moisture: {
          min: 40,
          max: 60,
          low: "Irrigate during bulb formation.",
          high: "Stop irrigation before harvest."
        },
        pH: {
          min: 6.0,
          max: 7.0,
          low: "Add lime.",
          high: "Use compost to reduce pH."
        },
        temperature: {
          min: 13,
          max: 25,
          low: "Delay sowing or protect young plants.",
          high: "Frequent irrigation."
        },
        humidity: {
          min: 40,
          max: 70,
          low: "Ensure proper irrigation.",
          high: "Improve airflow to prevent fungal diseases."
        },
        light: {
          min: 2,
          max: 11,
          low: "Ensure full sunlight.",
          high: "Good for bulbing."
        }
      },
      Tomato: {
        moisture: {
          min: 50,
          max: 70,
          low: "Irrigate regularly, especially during flowering and fruit set.",
          high: "Reduce water to prevent fungal diseases."
        },
        pH: {
          min: 6.0,
          max: 6.8,
          low: "Add lime.",
          high: "Add compost or acidifying fertilizer."
        },
        temperature: {
          min: 18,
          max: 27,
          low: "Protect from frost.",
          high: "Shade nets and proper irrigation."
        },
        humidity: {
          min: 50,
          max: 70,
          low: "Mist or irrigate more.",
          high: "Prune for ventilation; use disease-resistant varieties."
        },
        light: {
          min: 2,
          max: 8,
          low: "Ensure 6–8 hours of sun.",
          high: "Ideal, but use mulch to protect soil."
        }
      },
      Moong: {
        moisture: {
          min: 40,
          max: 60,
          low: "Irrigate during flowering and pod formation.",
          high: "Avoid waterlogging; improve drainage."
        },
        pH: {
          min: 6.2,
          max: 7.2,
          low: "Apply lime to balance soil acidity.",
          high: "Add organic matter or sulfur to reduce pH."
        },
        temperature: {
          min: 25,
          max: 35,
          low: "Protect seedlings from cold; delay sowing.",
          high: "Provide partial shade; water adequately."
        },
        humidity: {
          min: 40,
          max: 70,
          low: "Irrigate more frequently.",
          high: "Improve air circulation to prevent fungal issues."
        },
        light: {
          min: 3,
          max: 8,
          low: "Ensure 6–8 hours of sun exposure.",
          high: "Consider shade netting during intense heat."
        }
      },
      Urad: {
        moisture: {
          min: 40,
          max: 60,
          low: "Water during flowering and pod-filling stages.",
          high: "Avoid water stagnation."
        },
        pH: {
          min: 6.0,
          max: 7.5,
          low: "Add lime to neutralize soil.",
          high: "Use compost and organic matter to balance."
        },
        temperature: {
          min: 25,
          max: 35,
          low: "Ensure sowing at optimal season.",
          high: "Apply mulch and irrigate to reduce heat stress."
        },
        humidity: {
          min: 40,
          max: 70,
          low: "Irrigate adequately.",
          high: "Use fungicide if fungal diseases appear."
        },
        light: {
          min: 3,
          max: 8,
          low: "Ensure open field exposure.",
          high: "Use partial shade if needed."
        }
      },
      Groundnut: {
        moisture: {
          min: 45,
          max: 60,
          low: "Water during pegging and pod formation.",
          high: "Avoid excess watering; ensure drainage."
        },
        pH: {
          min: 5.5,
          max: 6.5,
          low: "Add lime to neutralize acidic soils.",
          high: "Add sulfur or organic compost."
        },
        temperature: {
          min: 25,
          max: 30,
          low: "Delay sowing; protect early crops.",
          high: "Water adequately; provide mulch or shade."
        },
        humidity: {
          min: 40,
          max: 70,
          low: "Increase irrigation frequency.",
          high: "Prevent fungal issues with airflow."
        },
        light: {
          min: 2,
          max: 11,
          low: "Ensure open sun exposure.",
          high: "Use shade nets temporarily."
        }
      },
      Mustard: {
        moisture: {
          min: 35,
          max: 55,
          low: "Water during flowering and pod-filling.",
          high: "Reduce watering to prevent root rot."
        },
        pH: {
          min: 6.0,
          max: 7.5,
          low: "Apply lime.",
          high: "Add organic compost or sulfur."
        },
        temperature: {
          min: 10,
          max: 25,
          low: "Use row covers or delay planting.",
          high: "Irrigate well and protect from bolting."
        },
        humidity: {
          min: 40,
          max: 60,
          low: "Water regularly.",
          high: "Improve air circulation."
        },
        light: {
          min: 2,
          max: 8,
          low: "Choose open areas for planting.",
          high: "Provide partial shading if necessary."
        }
      },
      Soybean: {
        moisture: {
          min: 50,
          max: 65,
          low: "Irrigate during flowering and pod-filling.",
          high: "Avoid waterlogging; soybeans are sensitive to excess water."
        },
        pH: {
          min: 6.0,
          max: 7.5,
          low: "Add lime.",
          high: "Add compost to balance pH."
        },
        temperature: {
          min: 20,
          max: 30,
          low: "Ensure warmth; delay sowing.",
          high: "Water frequently and mulch."
        },
        humidity: {
          min: 50,
          max: 70,
          low: "Increase irrigation.",
          high: "Prevent diseases by spacing plants well."
        },
        light: {
          min: 2,
          max: 11,
          low: "Ensure full sunlight.",
          high: "Consider temporary shading during extreme heat."
        }
      },
      Sunflower: {
        moisture: {
          min: 30,
          max: 50,
          low: "Water during vegetative and flowering stages.",
          high: "Prevent waterlogging and root rot."
        },
        pH: {
          min: 6.5,
          max: 7.5,
          low: "Lime application advised.",
          high: "Use acidifying agents or compost."
        },
        temperature: {
          min: 20,
          max: 25,
          low: "Delay sowing; provide warmth.",
          high: "Use shade and increase irrigation."
        },
        humidity: {
          min: 40,
          max: 60,
          low: "Increase water frequency.",
          high: "Improve air circulation to avoid fungal issues."
        },
        light: {
          min: 2,
          max: 11,
          low: "Sunflower requires full sun.",
          high: "Not usually an issue, but shade can be provided in extreme cases."
        }
      },
      Rice: {
        moisture: {
          min: 60,
          max: 80,
          low: "Ensure consistent irrigation, especially during fruiting.",
          high: "Avoid waterlogging, ensure well-drained soil."
        },
        pH: {
          min: 5.0,
          max: 7.5,
          low: "Apply lime to raise pH.",
          high: "Use sulfur to lower pH."
        },
        temperature: {
          min: 20,
          max: 37,
          low: "Provide warmth and avoid frost.",
          high: "Ensure proper irrigation and shade to reduce heat stress."
        },
        humidity: {
          min: 60,
          max: 80,
          low: "Ensure consistent irrigation.",
          high: "Ensure proper airflow and reduce water stagnation."
        },
        light: {
          min: 3,
          max: 8,
          low: "Ensure full sun exposure.",
          high: "Provide partial shade during peak heat."
        }
      },
      Wheat: {
        moisture: {
          min: 40,
          max: 60,
          low: "Ensure regular irrigation during dry periods.",
          high: "Avoid over-irrigation; ensure well-drained soil."
        },
        pH: {
          min: 6.0,
          max: 7.5,
          low: "Apply lime to raise pH.",
          high: "Use sulfur to lower pH."
        },
        temperature: {
          min: 15,
          max: 25,
          low: "Use frost protection and ensure proper warming.",
          high: "Ensure irrigation and some shade to protect against heat stress."
        },
        humidity: {
          min: 40,
          max: 60,
          low: "Ensure sufficient moisture.",
          high: "Ensure airflow to prevent fungal diseases."
        },
        light: {
          min: 2,
          max: 10,
          low: "Ensure full sun exposure.",
          high: "Provide shade during peak hours."
        }
      },
      Maize: {
        moisture: {
          min: 50,
          max: 70,
          low: "Ensure consistent irrigation, especially during tasseling.",
          high: "Avoid waterlogging and ensure good drainage."
        },
        pH: {
          min: 5.8,
          max: 7.0,
          low: "Apply lime to raise pH.",
          high: "Use sulfur to lower pH."
        },
        temperature: {
          min: 20,
          max: 30,
          low: "Ensure protection from frost.",
          high: "Provide shade and ensure proper irrigation."
        },
        humidity: {
          min: 50,
          max: 70,
          low: "Ensure sufficient moisture and irrigation.",
          high: "Ensure airflow and prevent fungal infections."
        },
        light: {
          min: 2,
          max: 10,
          low: "Ensure full sun exposure.",
          high: "Use some shade during extreme heat."
        }
      },
      Barley: {
        moisture: {
          min: 30,
          max: 50,
          low: "Ensure consistent irrigation during dry periods.",
          high: "Avoid waterlogging; ensure proper drainage."
        },
        pH: {
          min: 6.0,
          max: 8.5,
          low: "Apply lime to raise pH.",
          high: "Use sulfur to lower pH."
        },
        temperature: {
          min: 12,
          max: 25,
          low: "Ensure protection from frost.",
          high: "Ensure irrigation and shade to avoid heat stress."
        },
        humidity: {
          min: 50,
          max: 60,
          low: "Ensure sufficient moisture and irrigation.",
          high: "Ensure airflow and prevent fungal growth."
        },
        light: {
          min: 2,
          max: 10,
          low: "Ensure full sun exposure.",
          high: "Provide some shade during peak heat."
        }
      },
      Millets: {
        moisture: {
          min: 25,
          max: 50,
          low: "Ensure consistent irrigation during drought conditions.",
          high: "Avoid over-watering, ensure good drainage."
        },
        pH: {
          min: 5.0,
          max: 8.0,
          low: "Apply lime to raise pH.",
          high: "Use sulfur to lower pH."
        },
        temperature: {
          min: 20,
          max: 35,
          low: "Ensure protection from frost.",
          high: "Provide shade and adequate irrigation to reduce heat stress."
        },
        humidity: {
          min: 40,
          max: 70,
          low: "Ensure irrigation to prevent water stress.",
          high: "Ensure airflow to prevent mold and fungal growth."
        },
        light: {
          min: 2,
          max: 11,
          low: "Ensure full sun exposure.",
          high: "Provide shade during peak heat."
        }
      },
      Gram: {
        moisture: {
          min: 30,
          max: 40,
          low: "Ensure regular irrigation, especially during flowering.",
          high: "Avoid waterlogging; ensure good drainage."
        },
        pH: {
          min: 6.0,
          max: 8.0,
          low: "Apply lime to raise pH.",
          high: "Use sulfur to lower pH."
        },
        temperature: {
          min: 15,
          max: 30,
          low: "Provide frost protection.",
          high: "Ensure irrigation and partial shading to avoid heat stress."
        },
        humidity: {
          min: 40,
          max: 60,
          low: "Ensure consistent moisture.",
          high: "Ensure proper airflow to prevent fungal infections."
        },
        light: {
          min: 2,
          max: 11,
          low: "Ensure full sun exposure for better growth.",
          high: "Provide shade if needed."
        }
      },
      Arhar: {
        moisture: {
          min: 35,
          max: 50,
          low: "Ensure irrigation, particularly during flowering.",
          high: "Avoid over-irrigation, ensure good drainage."
        },
        pH: {
          min: 6.0,
          max: 8.5,
          low: "Apply lime to raise pH.",
          high: "Use sulfur to lower pH."
        },
        temperature: {
          min: 18,
          max: 35,
          low: "Ensure protection from frost.",
          high: "Provide irrigation and shade to reduce heat stress."
        },
        humidity: {
          min: 40,
          max: 70,
          low: "Ensure consistent moisture.",
          high: "Ensure airflow and reduce the risk of fungal diseases."
        },
        light: {
          min: 2,
          max: 11,
          low: "Ensure full sun exposure.",
          high: "Provide partial shade during peak heat."
        }
      }                                                                                                                                                
      
    };
  
    const data = thresholds[crop];
    if (!data) return [`Crop data for '${crop}' not available.`];
  
    const results = [];
  
    function check(value, { min, max, low, high }, label) {
      if (value < min) results.push(`${label} too low: ${low}`);
      else if (value > max) results.push(`${label} too high: ${high}`);
    }
  
    check(moisture, data.moisture, "Soil Moisture");
    check(pH, data.pH, "pH");
    check(temperature, data.temperature, "Temperature");
    check(humidity, data.humidity, "Humidity");
    check(light, data.light, "Light/UV");
  
    return results.length > 0 ? results : ["System Status: All parameters within optimal range."];
  }
  
  module.exports = getAdvice;
  