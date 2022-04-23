TSC=npx tsc
TARGET=bot
.PHONY=all clean

all: bot

$(TARGET):
	$(TSC) --build src

watch:
	$(TSC) --watch src

clean:
	rm -rf build *.tsbuildinfo
