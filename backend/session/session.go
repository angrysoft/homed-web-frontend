package session

import (
	"sync"
	"time"
)

type Manager struct {
	cookieName  string
	lock        sync.Mutex
	maxLifeTime uint64
	provider Provider
}

func New() *Manager {
	return &Manager{
		cookieName:  "gosessionid",
		lock:        sync.Mutex{},
		maxLifeTime: 3600,
	}
}

type Session interface {
	Set(key string, value any) error
	Get(key string) (any, error)
	Delete(key string) error
	SessionId() string
}

type MemSession struct {
	sid string
	timeAccessed time.Time
	value map[string]any
}

func (ms *MemSession) Set(key string, value any) error {
	ms.value[key] = value
	return nil
}

type Provider interface {}

