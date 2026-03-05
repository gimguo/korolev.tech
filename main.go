package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"time"
)

// CommandRequest — входящий запрос от терминала
type CommandRequest struct {
	Command string `json:"command"`
	Args    string `json:"args,omitempty"`
}

// CommandResponse — ответ терминала
type CommandResponse struct {
	Output string `json:"output"`
	Type   string `json:"type"` // "text", "error", "html"
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "80"
	}

	mux := http.NewServeMux()

	// API endpoint для будущей сложной логики
	mux.HandleFunc("/api/command", handleCommand)

	// Health-check
	mux.HandleFunc("/api/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{
			"status": "ok",
			"time":   time.Now().Format(time.RFC3339),
		})
	})

	// Статика — запрет кеширования для всех файлов (обход Cloudflare CDN)
	fs := http.FileServer(http.Dir("./static"))
	mux.Handle("/", noCache(fs))

	log.Printf("🖥  korolev.tech terminal starting on :%s", port)
	if err := http.ListenAndServe(":"+port, mux); err != nil {
		log.Fatalf("Server failed: %v", err)
	}
}

// noCache оборачивает файл-сервер и запрещает кеширование всей статики
func noCache(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
		w.Header().Set("Pragma", "no-cache")
		w.Header().Set("Expires", "0")
		next.ServeHTTP(w, r)
	})
}

func handleCommand(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		json.NewEncoder(w).Encode(CommandResponse{
			Output: "Method not allowed",
			Type:   "error",
		})
		return
	}

	var req CommandRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(CommandResponse{
			Output: "Invalid request",
			Type:   "error",
		})
		return
	}

	// Обработка команд на стороне сервера (для будущего расширения)
	resp := processCommand(req)
	json.NewEncoder(w).Encode(resp)
}

func processCommand(req CommandRequest) CommandResponse {
	switch req.Command {
	case "ping":
		return CommandResponse{
			Output: "pong 🏓",
			Type:   "text",
		}
	case "uptime":
		return CommandResponse{
			Output: "Server is running since startup. All systems nominal.",
			Type:   "text",
		}
	case "date":
		return CommandResponse{
			Output: time.Now().Format("Mon Jan 2 15:04:05 MST 2006"),
			Type:   "text",
		}
	default:
		return CommandResponse{
			Output: "Command '" + req.Command + "' handled client-side",
			Type:   "text",
		}
	}
}
