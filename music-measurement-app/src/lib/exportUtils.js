/**
 * Export Utilities for LJPW Music App
 *
 * Provides functions to export analysis results in various formats.
 */

/**
 * Export data as JSON file
 *
 * @param {Object} data - The data to export
 * @param {string} filename - The filename (without extension)
 */
export function exportAsJSON(data, filename = 'ljpw-analysis') {
  const json = JSON.stringify(data, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  downloadBlob(blob, `${filename}.json`)
}

/**
 * Export data as CSV file
 *
 * @param {Object} data - The data to export (flat object or array of objects)
 * @param {string} filename - The filename (without extension)
 */
export function exportAsCSV(data, filename = 'ljpw-analysis') {
  let csv = ''

  if (Array.isArray(data)) {
    // Array of objects
    if (data.length === 0) return

    const headers = Object.keys(data[0])
    csv = headers.join(',') + '\n'

    data.forEach(row => {
      csv += headers.map(h => formatCSVValue(row[h])).join(',') + '\n'
    })
  } else {
    // Single object - create key-value pairs
    csv = 'Property,Value\n'
    flattenObject(data).forEach(({ key, value }) => {
      csv += `${formatCSVValue(key)},${formatCSVValue(value)}\n`
    })
  }

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  downloadBlob(blob, `${filename}.csv`)
}

/**
 * Format LJPW analysis result for export
 *
 * @param {Object} result - Raw analysis result
 * @returns {Object} Formatted data for export
 */
export function formatAnalysisForExport(result) {
  if (!result) return null

  const exportData = {
    exportedAt: new Date().toISOString(),
    appVersion: 'LJPW V8.4',

    // Basic info
    song: result.fileName || 'Unknown',
    duration: result.duration ? `${Math.round(result.duration)}s` : null,

    // LJPW Dimensions
    dimensions: {
      love: result.L,
      justice: result.J,
      power: result.P,
      wisdom: result.W,
    },

    // Computed metrics
    metrics: {
      harmonyIndex: result.H,
      semanticVoltage: result.V,
      consciousness: result.consciousness,
    },

    // Phase classification
    phase: {
      name: result.phase?.phase,
      description: result.phase?.description,
    },

    // Dominant dimension
    dominant: result.dominant ? {
      dimension: result.dominant.name,
      value: result.dominant.value,
    } : null,

    // Audio features (if available)
    audioFeatures: result.audioFeatures ? {
      tempo: result.audioFeatures.tempo,
      key: result.audioFeatures.key,
      mode: result.audioFeatures.mode,
      energy: result.audioFeatures.energy,
      valence: result.audioFeatures.valence,
    } : null,
  }

  return exportData
}

/**
 * Format Song Profile Builder result for export
 */
export function formatProfileForExport(profile, analysis) {
  if (!analysis) return null

  return {
    exportedAt: new Date().toISOString(),
    appVersion: 'LJPW V8.4',

    // Song configuration
    configuration: {
      key: profile.key,
      mode: profile.mode,
      genre: profile.genre,
      tempo: profile.tempo,
    },

    // LJPW Dimensions
    dimensions: {
      love: analysis.L,
      justice: analysis.J,
      power: analysis.P,
      wisdom: analysis.W,
    },

    // Metrics
    metrics: {
      harmonyIndex: analysis.H,
      semanticVoltage: analysis.V,
      consciousness: analysis.consciousness,
    },

    // Phase
    phase: analysis.phase?.phase,
    phaseDescription: analysis.phase?.description,

    // Dominant
    dominantDimension: analysis.dominant?.name,
  }
}

/**
 * Format Generative Equation analysis for export
 */
export function formatGenerativeForExport(analysis) {
  if (!analysis) return null

  return {
    exportedAt: new Date().toISOString(),
    appVersion: 'LJPW V8.4 Generative',

    // Song LJPW
    dimensions: {
      love: analysis.song.L,
      justice: analysis.song.J,
      power: analysis.song.P,
      wisdom: analysis.song.W,
    },

    // Summary
    summary: {
      emotionalConnection: analysis.generative.summary.generativeLove,
      firstImpression: analysis.generative.summary.initialImpact,
      hasHope: analysis.generative.summary.hasHope,
      isAutopoietic: analysis.generative.summary.isAutopoietic,
      isEarworm: analysis.generative.summary.isEarworm,
    },

    // Life inequality
    memorability: {
      stickinessScore: analysis.custom.lifeCheck.ratio,
      phase: analysis.custom.lifeCheck.phase,
      verdict: analysis.custom.lifeCheck.verdict,
    },

    // Earworm
    earworm: {
      potential: analysis.generative.earworm.earwormPotential,
      isEarworm: analysis.generative.earworm.isEarworm,
      stickinessIterations: analysis.generative.earworm.stickinessIterations,
    },

    // Reach
    reach: {
      maxDistance: analysis.generative.propagation.maxSustainableDistance,
    },

    // Parameters used
    parameters: {
      listens: analysis.custom.iterations,
      culturalGap: analysis.custom.distance,
    },
  }
}

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Download a blob as a file
 */
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Format a value for CSV (escape quotes, handle special types)
 */
function formatCSVValue(value) {
  if (value === null || value === undefined) {
    return ''
  }

  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }

  const stringValue = String(value)

  // Escape quotes and wrap in quotes if contains comma, quote, or newline
  if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
    return `"${stringValue.replace(/"/g, '""')}"`
  }

  return stringValue
}

/**
 * Flatten a nested object into key-value pairs
 */
function flattenObject(obj, prefix = '') {
  const result = []

  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key

    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      result.push(...flattenObject(value, fullKey))
    } else {
      result.push({ key: fullKey, value })
    }
  }

  return result
}

export default {
  exportAsJSON,
  exportAsCSV,
  formatAnalysisForExport,
  formatProfileForExport,
  formatGenerativeForExport,
}
