# ── Build stage ──────────────────────────────────────────
FROM golang:1.22-alpine AS builder

WORKDIR /build
COPY go.mod .
COPY main.go .
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o server main.go

# ── Runtime stage ────────────────────────────────────────
FROM alpine:3.19

RUN apk add --no-cache ca-certificates tzdata \
    && cp /usr/share/zoneinfo/Europe/Moscow /etc/localtime \
    && echo "Europe/Moscow" > /etc/timezone

WORKDIR /app
COPY --from=builder /build/server .
COPY static/ ./static/

EXPOSE 80
CMD ["./server"]
