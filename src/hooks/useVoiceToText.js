import { useState, useEffect, useRef } from 'react'
import { toast } from 'react-toastify'

export const useVoiceToText = () => {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [isSupported, setIsSupported] = useState(false)
  const recognitionRef = useRef(null)

  useEffect(() => {
    // Check if Speech Recognition is supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    
    if (SpeechRecognition) {
      setIsSupported(true)
      recognitionRef.current = new SpeechRecognition()
      
      const recognition = recognitionRef.current
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = 'en-US'

      recognition.onstart = () => {
        setIsListening(true)
        toast.info('Voice recording started. Speak now...', {
          autoClose: 2000,
          hideProgressBar: true
        })
      }

      recognition.onresult = (event) => {
        let finalTranscript = ''
        let interimTranscript = ''

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i]
          if (result.isFinal) {
            finalTranscript += result[0].transcript
          } else {
            interimTranscript += result[0].transcript
          }
        }

        setTranscript(finalTranscript + interimTranscript)
      }

      recognition.onend = () => {
        setIsListening(false)
        toast.success('Voice recording stopped', {
          autoClose: 2000,
          hideProgressBar: true
        })
      }

      recognition.onerror = (event) => {
        setIsListening(false)
        console.error('Speech recognition error:', event.error)
        
        let errorMessage = 'Voice recognition error'
        switch (event.error) {
          case 'no-speech':
            errorMessage = 'No speech detected. Please try again.'
            break
          case 'audio-capture':
            errorMessage = 'Microphone not accessible. Please check permissions.'
            break
          case 'not-allowed':
            errorMessage = 'Microphone permission denied. Please allow microphone access.'
            break
          case 'network':
            errorMessage = 'Network error. Please check your connection.'
            break
          default:
            errorMessage = `Voice recognition error: ${event.error}`
        }
        
        toast.error(errorMessage, {
          autoClose: 4000
        })
      }
    } else {
      setIsSupported(false)
      console.warn('Speech Recognition not supported in this browser')
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort()
      }
    }
  }, [])

  const startListening = () => {
    if (!isSupported) {
      toast.error('Voice recognition is not supported in your browser', {
        autoClose: 4000
      })
      return
    }

    if (!isListening && recognitionRef.current) {
      setTranscript('')
      recognitionRef.current.start()
    }
  }

  const stopListening = () => {
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop()
    }
  }

  const clearTranscript = () => {
    setTranscript('')
  }

  const resetTranscript = () => {
    setTranscript('')
  }

  return {
    isListening,
    transcript,
    isSupported,
    startListening,
    stopListening,
    clearTranscript,
    resetTranscript
  }
}

